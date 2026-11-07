<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Scholarship;
use Illuminate\Support\Facades\DB;

class ScholarshipController extends Controller
{
    /**
     * Liste des bourses actives ou ouvertes avec pagination et filtres
     */
    public function index(Request $request)
    {
        $perPage = (int) $request->input('per_page', 12);
        $query = Scholarship::query();

        // N'inclure que les bourses valides (deadline future ou non spécifiée/continue)
        $this->applyActiveScope($query);

        // Tri
        $sortBy = $request->input('sort_by', 'deadline');
        $sortOrder = $request->input('sort_order', 'asc');

        if ($sortBy === 'deadline') {
            // Mettre les deadlines nulles à la fin
            $query->orderByRaw('CASE WHEN deadline IS NULL THEN 1 ELSE 0 END')
                  ->orderBy('deadline', $sortOrder);
        } elseif ($sortBy === 'latest') {
            $query->orderBy('created_at', 'desc');
        } else {
            $query->orderBy('id', 'desc');
        }

        $scholarships = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $scholarships->items(),
            'pagination' => [
                'total' => $scholarships->total(),
                'per_page' => $scholarships->perPage(),
                'current_page' => $scholarships->currentPage(),
                'last_page' => $scholarships->lastPage(),
                'has_more_pages' => $scholarships->hasMorePages(),
            ]
        ]);
    }

    /**
     * Détail d'une bourse par ID
     */
    public function show($id)
    {
        $scholarship = Scholarship::find($id);

        if (!$scholarship) {
            return response()->json([
                'success' => false,
                'message' => 'Bourse introuvable'
            ], 404);
        }

        // Bourses similaires / recommandées dans le même domaine ou même pays
        $related = Scholarship::where('id', '!=', $scholarship->id)
            ->where(function ($q) use ($scholarship) {
                if ($scholarship->domain) {
                    $q->orWhere('domain', 'LIKE', '%' . $scholarship->domain . '%');
                }
                if ($scholarship->country) {
                    $q->orWhere('country', $scholarship->country);
                }
            })
            ->limit(3)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $scholarship,
            'related' => $related
        ]);
    }

    /**
     * Recherche avancée avec facettes multiples
     */
    public function search(Request $request)
    {
        $query = Scholarship::query();
        $this->applyActiveScope($query);
        $like = $this->likeOperator();

        // Recherche par mot-clé global (titre, description, université)
        if ($request->filled('q')) {
            $keyword = trim($request->q);
            $query->where(function ($q) use ($keyword, $like) {
                $q->where('title', $like, "%{$keyword}%")
                  ->orWhere('university', $like, "%{$keyword}%")
                  ->orWhere('description', $like, "%{$keyword}%")
                  ->orWhere('country', $like, "%{$keyword}%")
                  ->orWhere('domain', $like, "%{$keyword}%");
            });
        }

        // Filtre par pays
        if ($request->filled('country')) {
            $query->where('country', $like, '%' . trim($request->country) . '%');
        }

        // Filtre par domaine / filière
        if ($request->filled('domain')) {
            $query->where(function ($q) use ($request, $like) {
                $q->where('domain', $like, '%' . trim($request->domain) . '%')
                  ->orWhere('title', $like, '%' . trim($request->domain) . '%');
            });
        }

        // Filtre par niveau d'études
        if ($request->filled('level')) {
            $query->where('level', $like, '%' . trim($request->level) . '%');
        }

        // Filtre par type de financement (ex: fully_funded)
        if ($request->filled('funding_type')) {
            $funding = trim($request->funding_type);
            if ($funding === 'full' || $funding === 'fully_funded') {
                $query->where(function ($q) use ($like) {
                    $q->where('funding_type', $like, '%full%')
                      ->orWhere('funding_type', $like, '%entièrement%');
                });
            } elseif ($funding === 'partial') {
                $query->where(function ($q) use ($like) {
                    $q->where('funding_type', $like, '%partial%')
                      ->orWhere('funding_type', $like, '%partiel%');
                });
            }
        }

        // Tri
        $sortBy = $request->input('sort_by', 'deadline');
        if ($sortBy === 'latest') {
            $query->orderBy('created_at', 'desc');
        } else {
            $query->orderByRaw('CASE WHEN deadline IS NULL THEN 1 ELSE 0 END')
                  ->orderBy('deadline', 'asc');
        }

        $perPage = (int) $request->input('per_page', 12);
        $results = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $results->items(),
            'pagination' => [
                'total' => $results->total(),
                'per_page' => $results->perPage(),
                'current_page' => $results->currentPage(),
                'last_page' => $results->lastPage(),
                'has_more_pages' => $results->hasMorePages(),
            ]
        ]);
    }

    /**
     * Liste des pays avec le nombre de bourses disponibles
     */
    public function countries()
    {
        $query = Scholarship::query();
        $this->applyActiveScope($query);

        $counts = $query->whereNotNull('country')
            ->select('country', DB::raw('count(*) as total'))
            ->groupBy('country')
            ->orderBy('total', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $counts
        ]);
    }

    /**
     * Bourses pour un pays donné
     */
    public function byCountry($country, Request $request)
    {
        $perPage = (int) $request->input('per_page', 12);
        $query = Scholarship::query();
        $this->applyActiveScope($query);
        $like = $this->likeOperator();

        $query->where('country', $like, '%' . trim($country) . '%')
              ->orderByRaw('CASE WHEN deadline IS NULL THEN 1 ELSE 0 END')
              ->orderBy('deadline', 'asc');

        $scholarships = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'country' => $country,
            'data' => $scholarships->items(),
            'pagination' => [
                'total' => $scholarships->total(),
                'per_page' => $scholarships->perPage(),
                'current_page' => $scholarships->currentPage(),
                'last_page' => $scholarships->lastPage(),
            ]
        ]);
    }

    /**
     * Statistiques globales de la plateforme
     */
    public function statistics()
    {
        $query = Scholarship::query();
        $this->applyActiveScope($query);
        $like = $this->likeOperator();

        $totalScholarships = (clone $query)->count();
        $totalCountries = (clone $query)->whereNotNull('country')->distinct('country')->count('country');
        $totalUniversities = (clone $query)->whereNotNull('university')->distinct('university')->count('university');
        $fullyFundedCount = (clone $query)->where(function ($q) use ($like) {
            $q->where('funding_type', $like, '%full%')
              ->orWhere('funding_type', $like, '%entièrement%');
        })->count();

        return response()->json([
            'success' => true,
            'data' => [
                'scholarships' => $totalScholarships,
                'countries' => $totalCountries,
                'universities' => $totalUniversities,
                'fully_funded' => $fullyFundedCount,
            ]
        ]);
    }

    /**
     * Helper pour opérateur SQL LIKE insensible selon le driver
     */
    private function likeOperator(): string
    {
        return DB::connection()->getDriverName() === 'pgsql' ? 'ILIKE' : 'LIKE';
    }

    /**
     * Scope pour exclure les bourses formellement expirées
     */
    private function applyActiveScope($query)
    {
        $query->where(function ($q) {
            $q->whereNull('deadline')
              ->orWhere('deadline', '>=', now()->toDateString());
        });
    }
}
