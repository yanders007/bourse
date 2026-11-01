export interface Scholarship {
  id: number;
  title: string;
  country: string | null;
  university: string | null;
  domain: string | null;
  level: string | null;
  deadline: string | null;
  description: string | null;
  details?: string | null;
  funding_type: string | null;
  benefits: string | null;
  requirements: string | null;
  required_documents: string | null;
  image: string | null;
  link: string;
  apply_link: string | null;
  official_website: string | null;
  source?: string | null;
  created_at?: string;
  updated_at?: string;
  match_score?: number;
}

export interface Statistics {
  scholarships: number;
  countries: number;
  universities: number;
  fully_funded: number;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'admin';
  study_domain?: string | null;
  study_level?: string | null;
  destination_countries?: string | null;
  origin_country?: string | null;
}

export interface FilterParams {
  q?: string;
  country?: string;
  domain?: string;
  level?: string;
  funding_type?: string;
  sort_by?: 'deadline' | 'latest';
  page?: number;
  per_page?: number;
}
