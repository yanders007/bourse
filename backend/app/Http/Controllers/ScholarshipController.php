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

        // Recherche par mot-clé global (titre, description, université)
        if ($request->filled('q')) {
            $keyword = trim($request->q);
            $query->where(function ($q) use ($keyword) {
                $q->where('title', 'ILIKE', "%{$keyword}%")
                  ->orWhere('university', 'ILIKE', "%{$keyword}%")
                  ->orWhere('description', 'ILIKE', "%{$keyword}%")
                  ->orWhere('country', 'ILIKE', "%{$keyword}%")
                  ->orWhere('domain', 'ILIKE', "%{$keyword}%");
            });
        }

        // Filtre par pays
        if ($request->filled('country')) {
            $query->where('country', 'ILIKE', '%' . trim($request->country) . '%');
        }

        // Filtre par domaine / filière
        if ($request->filled('domain')) {
            $query->where(function ($q) use ($request) {
                $q->where('domain', 'ILIKE', '%' . trim($request->domain) . '%')
                  ->orWhere('title', 'ILIKE', '%' . trim($request->domain) . '%');
            });
        }

        // Filtre par niveau d'études
        if ($request->filled('level')) {
            $query->where('level', 'ILIKE', '%' . trim($request->level) . '%');
        }

        // Filtre par type de financement (ex: fully_funded)
        if ($request->filled('funding_type')) {
            $funding = trim($request->funding_type);
            if ($funding === 'full' || $funding === 'fully_funded') {
                $query->where(function ($q) {
                    $q->where('funding_type', 'ILIKE', '%full%')
                      ->orWhere('funding_type', 'ILIKE', '%entièrement%');
                });
            } elseif ($funding === 'partial') {
                $query->where(function ($q) {
                    $q->where('funding_type', 'ILIKE', '%partial%')
                      ->orWhere('funding_type', 'ILIKE', '%partiel%');
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

        $query->where('country', 'ILIKE', '%' . trim($country) . '%')
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

        $totalScholarships = (clone $query)->count();
        $totalCountries = (clone $query)->whereNotNull('country')->distinct('country')->count('country');
        $totalUniversities = (clone $query)->whereNotNull('university')->distinct('university')->count('university');
        $fullyFundedCount = (clone $query)->where(function ($q) {
            $q->where('funding_type', 'ILIKE', '%full%')
              ->orWhere('funding_type', 'ILIKE', '%entièrement%');
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
