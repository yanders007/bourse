<?php

namespace App\Services;

use App\Models\User;
use App\Models\Scholarship;

class NextScoreService
{
    /**
     * Pondérations pour le calcul du score de compatibilité
     */
    private const WEIGHTS = [
        'domain' => 45,       // Adéquation de la filière / domaine
        'level' => 25,        // Adéquation du niveau d'études (Licence, Master, Doctorat)
        'country' => 20,      // Pays de destination souhaité
        'funding' => 10,      // Bonus pour bourse entièrement financée (crucial pour étudiant international)
    ];

    /**
     * Calcule le score global de 0 à 100%
     */
    public function calculateScore(User $user, Scholarship $scholarship): int
    {
        $score = 0;

        $score += $this->scoreDomain($user, $scholarship);
        $score += $this->scoreLevel($user, $scholarship);
        $score += $this->scoreCountry($user, $scholarship);
        $score += $this->scoreFunding($scholarship);

        return min(100, (int) round($score));
    }

    /**
     * Retourne le score détaillé avec explications
     */
    public function getScoreDetails(User $user, Scholarship $scholarship): array
    {
        $domainScore = $this->scoreDomain($user, $scholarship);
        $levelScore = $this->scoreLevel($user, $scholarship);
        $countryScore = $this->scoreCountry($user, $scholarship);
        $fundingScore = $this->scoreFunding($scholarship);

        return [
            'total_score' => min(100, (int) round($domainScore + $levelScore + $countryScore + $fundingScore)),
            'details' => [
                'domain' => [
                    'score' => $domainScore,
                    'max' => self::WEIGHTS['domain'],
                    'matched' => $domainScore > 0,
                ],
                'level' => [
                    'score' => $levelScore,
                    'max' => self::WEIGHTS['level'],
                    'matched' => $levelScore > 0,
                ],
                'country' => [
                    'score' => $countryScore,
                    'max' => self::WEIGHTS['country'],
                    'matched' => $countryScore > 0,
                ],
                'funding' => [
                    'score' => $fundingScore,
                    'max' => self::WEIGHTS['funding'],
                    'is_fully_funded' => $fundingScore === self::WEIGHTS['funding'],
                ],
            ]
        ];
    }

    /**
     * Score basé sur la filière d'études
     */
    private function scoreDomain(User $user, Scholarship $scholarship): int
    {
        if (!$user->study_domain) {
            return (int) (self::WEIGHTS['domain'] / 2); // Score neutre si non spécifié
        }

        // Si la bourse est ouverte à tous les domaines ou non restreinte
        $scholarshipDomain = strtolower(trim((string) $scholarship->domain));
        if (
            empty($scholarshipDomain) ||
            str_contains($scholarshipDomain, 'all') ||
            str_contains($scholarshipDomain, 'tous') ||
            str_contains($scholarshipDomain, 'toutes') ||
            str_contains($scholarshipDomain, 'any')
        ) {
            return self::WEIGHTS['domain'];
        }

        $userDomains = array_map('trim', explode(',', strtolower($user->study_domain)));
        $haystack = strtolower(
            $scholarship->domain . ' ' .
            $scholarship->title . ' ' .
            ($scholarship->description ?? '')
        );

        foreach ($userDomains as $d) {
            if (empty($d)) continue;
            if (str_contains($haystack, $d)) {
                return self::WEIGHTS['domain'];
            }
        }

        // Dictionnaire de correspondances sémantiques (filières courantes)
        $synonyms = [
            'informatique' => ['computer', 'software', 'technology', 'data', 'it', 'cyber', 'ia', 'ai', 'science', 'engineering'],
            'computer science' => ['informatique', 'software', 'tech', 'data', 'developer', 'science'],
            'santé' => ['medicine', 'health', 'médical', 'biologie', 'pharmacie', 'nursing', 'biomedical'],
            'ingénierie' => ['engineering', 'ingénieur', 'technologie', 'science', 'mécanique', 'électrique', 'civil'],
            'économie' => ['economics', 'finance', 'business', 'commerce', 'gestion', 'management', 'banking'],
            'droit' => ['law', 'juridique', 'justice', 'human rights', 'politique', 'international relations'],
            'agronomie' => ['agriculture', 'environment', 'agronomy', 'rural', 'alimentaire', 'nature'],
        ];

        foreach ($userDomains as $d) {
            foreach ($synonyms as $key => $terms) {
                if (str_contains($d, $key)) {
                    foreach ($terms as $term) {
                        if (str_contains($haystack, $term)) {
                            return (int) (self::WEIGHTS['domain'] * 0.85);
                        }
                    }
                }
            }
        }

        return 0;
    }

    /**
     * Score basé sur le niveau d'études
     */
    private function scoreLevel(User $user, Scholarship $scholarship): int
    {
        if (!$user->study_level) {
            return (int) (self::WEIGHTS['level'] / 2);
        }

        $userLevel = strtolower(trim((string) $user->study_level));
        $scholarshipLevel = strtolower(trim((string) $scholarship->level));
        $context = strtolower($scholarshipLevel . ' ' . $scholarship->title . ' ' . ($scholarship->description ?? ''));

        // Normalisation Licence / Bachelor
        $isBachelor = str_contains($userLevel, 'licence') || str_contains($userLevel, 'bachelor') || str_contains($userLevel, 'undergraduate') || str_contains($userLevel, 'bac');
        // Normalisation Master
        $isMaster = str_contains($userLevel, 'master') || str_contains($userLevel, 'postgraduate') || str_contains($userLevel, 'bac+5') || str_contains($userLevel, 'ingénieur');
        // Normalisation Doctorat / PhD
        $isPhd = str_contains($userLevel, 'doctorat') || str_contains($userLevel, 'phd') || str_contains($userLevel, 'recherche');

        if ($isBachelor && (str_contains($context, 'bachelor') || str_contains($context, 'undergraduate') || str_contains($context, 'licence'))) {
            return self::WEIGHTS['level'];
        }
        if ($isMaster && (str_contains($context, 'master') || str_contains($context, 'postgraduate') || str_contains($context, 'graduate'))) {
            return self::WEIGHTS['level'];
        }
        if ($isPhd && (str_contains($context, 'phd') || str_contains($context, 'doctor') || str_contains($context, 'recherche') || str_contains($context, 'postdoc'))) {
            return self::WEIGHTS['level'];
        }

        // Si le niveau de la bourse n'est pas restreint
        if (empty($scholarshipLevel) || str_contains($scholarshipLevel, 'all') || str_contains($scholarshipLevel, 'tous')) {
            return (int) (self::WEIGHTS['level'] * 0.7);
        }

        return 0;
    }

    /**
     * Score basé sur les pays de destination préférés
     */
    private function scoreCountry(User $user, Scholarship $scholarship): int
    {
        if (!$user->destination_countries) {
            return (int) (self::WEIGHTS['country'] / 2);
        }

        $scholarshipCountry = strtolower(trim((string) $scholarship->country));
        $userCountries = array_map('trim', explode(',', strtolower($user->destination_countries)));

        // Bourses internationales ouvertes à plusieurs pays (ex: Erasmus Mundus, Mastercard)
        if (
            str_contains($scholarshipCountry, 'international') ||
            str_contains($scholarshipCountry, 'europe') ||
            str_contains($scholarshipCountry, 'multiple') ||
            str_contains($scholarshipCountry, 'mondial')
        ) {
            return self::WEIGHTS['country'];
        }

        foreach ($userCountries as $c) {
            if (empty($c)) continue;
            if (str_contains($scholarshipCountry, $c) || str_contains($c, $scholarshipCountry)) {
                return self::WEIGHTS['country'];
            }
        }

        return 0;
    }

    /**
     * Bonus pour financement complet
     */
    private function scoreFunding(Scholarship $scholarship): int
    {
        $funding = strtolower(trim((string) $scholarship->funding_type . ' ' . $scholarship->benefits));

        if (
            str_contains($funding, 'fully') ||
            str_contains($funding, 'entièrement') ||
            str_contains($funding, 'total') ||
            str_contains($funding, 'full tuition') ||
            str_contains($funding, 'stipend')
        ) {
            return self::WEIGHTS['funding'];
        }

        if (str_contains($funding, 'partial') || str_contains($funding, 'partiellement')) {
            return (int) (self::WEIGHTS['funding'] / 2);
        }

        return (int) (self::WEIGHTS['funding'] / 3);
    }
}
