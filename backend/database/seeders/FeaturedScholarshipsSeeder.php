<?php

namespace Database\Seeders;

use App\Models\Scholarship;
use Illuminate\Database\Seeder;

class FeaturedScholarshipsSeeder extends Seeder
{
    public function run(): void
    {
        $featured = [
            [
                'title' => 'Mastercard Foundation Scholars Program',
                'country' => 'International (Canada, France, Royaume-Uni, Afrique)',
                'university' => 'Universités partenaires (Sciences Po, UC Berkeley, McGill, Edimbourg, UCT)',
                'domain' => 'Toutes disciplines (Priorité Sciences, Santé, IA, Agriculture, Économie)',
                'level' => "Licence, Master",
                'deadline' => '2027-01-31',
                'description' => "Le programme de bourses de la Fondation Mastercard offre aux jeunes leaders africains talentueux et engagés l'opportunité de poursuivre des études supérieures complètes dans les meilleures institutions mondiales et africaines.",
                'details' => "Conçu pour les étudiants confrontés à d'importantes barrières financières, ce programme couvre l'ensemble des dépenses universitaires et de vie, accompagné d'un programme d'encadrement en leadership et retour au continent.",
                'funding_type' => 'Entièrement financée (100% + Allocation + Billets)',
                'benefits' => "Frais de scolarité complets pris en charge, hébergement étudiant, allocation mensuelle de subsistance, billets d'avion aller-retour, assurance santé complète, ordinateur portable et allocations livres, mentorat et stages.",
                'requirements' => "Être citoyen d'un pays d'Afrique subsaharienne, avoir d'excellents résultats académiques, démontrer un engagement communautaire ou associatif prouvé, justifier d'un besoin financier, s'engager à contribuer au développement de l'Afrique.",
                'required_documents' => "Relevés de notes officiels, diplômes antérieurs, CV orienté leadership et engagement, lettre de motivation sur votre vision pour l'Afrique, 2 à 3 lettres de recommandation académique et professionnelle, justificatifs de situation financière.",
                'image' => 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=60',
                'link' => 'https://mastercardfdn.org/all/scholars/',
                'apply_link' => 'https://mastercardfdn.org/all/scholars/becoming-a-scholar/apply-to-the-scholars-program/',
                'official_website' => 'https://mastercardfdn.org/',
                'source' => 'Programmes Phares Afrique'
            ],
            [
                'title' => 'Bourses France Excellence Eiffel',
                'country' => 'France',
                'university' => 'Grandes Écoles et Universités Françaises',
                'domain' => 'Ingénierie, Informatique & Numérique, Économie-Gestion, Droit & Sciences Politiques, Biologie-Santé',
                'level' => 'Master, Doctorat',
                'deadline' => '2027-01-10',
                'description' => "Le programme de bourses Eiffel est un outil développé par le Ministère de l'Europe et des Affaires étrangères français afin de permettre aux établissements français d'enseignement supérieur d'attirer les meilleurs étudiants étrangers dans des formations diplômantes.",
                'details' => "Les candidatures sont présentées obligatoirement par les universités françaises qui sélectionnent les profils parmi leurs admis internationaux d'excellence.",
                'funding_type' => 'Entièrement financée',
                'benefits' => "Allocation mensuelle de 1 181 € pour le Master et 1 800 € pour le Doctorat, prise en charge directe du transport international aller-retour, transport ferroviaire local, couverture sociale campus, activités culturelles et priorité sur les logements en résidence universitaire.",
                'requirements' => "Être de nationalité étrangère (binationaux franco-étrangers non éligibles), âgé de 27 ans maximum pour le Master et 32 ans pour le Doctorat, dossier académique de premier ordre, être présenté par un établissement d'enseignement supérieur français.",
                'required_documents' => "Curriculum Vitae détaillé, projet d'études ou projet de thèse rédigé, relevés de notes des 3 dernières années, diplômes universitaires, classement officiel dans la promotion, projet professionnel, attestations linguistiques (Français ou Anglais selon formation).",
                'image' => 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=60',
                'link' => 'https://www.campusfrance.org/fr/le-programme-de-bourses-france-excellence-eiffel',
                'apply_link' => 'https://www.campusfrance.org/fr/eiffel',
                'official_website' => 'https://www.campusfrance.org/',
                'source' => 'Campus France'
            ],
            [
                'title' => 'Chevening Scholarships (Gouvernement Britannique)',
                'country' => 'Royaume-Uni',
                'university' => 'Toutes les Universités du Royaume-Uni (Oxford, Cambridge, UCL, Imperial, LSE, Manchester...)',
                'domain' => 'Toutes disciplines',
                'level' => 'Master',
                'deadline' => '2026-11-05',
                'description' => "Chevening est le programme mondial de bourses d'études du gouvernement britannique, financé par le Foreign, Commonwealth and Development Office (FCDO) et des organisations partenaires.",
                'details' => "Il permet à des futurs leaders, décideurs et influenceurs du monde entier, y compris d'Afrique, de développer des compétences professionnelles et académiques, de créer des réseaux de contacts et de découvrir la culture britannique.",
                'funding_type' => 'Entièrement financée (100% frais + vie + visa)',
                'benefits' => "Frais de scolarité complets (sans plafond pour la majorité des cursus), allocation mensuelle pour loyer et dépenses courantes (~1 300 £), billet d'avion aller-retour en classe économique, frais de visa étudiant et de test médical TB remboursés, allocation d'arrivée et de départ.",
                'requirements' => "Être citoyen d'un pays éligible Chevening, posséder un diplôme universitaire de premier cycle (Licence / Bachelor équivalent 2:1 honours), cumuler au moins 2 ans (2 800 heures) d'expérience professionnelle (stages, bénévolat ou emplois), postuler à 3 programmes de Master éligibles au Royaume-Uni.",
                'required_documents' => "4 dissertations courtes (Leadership & Influence, Networking, Étudier au Royaume-Uni, Plan de carrière à 5 ans), diplômes et relevés de notes, 2 lettres de référence académiques ou professionnelles, offres d'admission inconditionnelles d'universités UK.",
                'image' => 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop&q=60',
                'link' => 'https://www.chevening.org/scholarships/',
                'apply_link' => 'https://www.chevening.org/apply/',
                'official_website' => 'https://www.chevening.org/',
                'source' => 'UK FCDO'
            ],
            [
                'title' => 'Bourses DAAD EPOS (Allemagne - Études Liées au Développement)',
                'country' => 'Allemagne',
                'university' => 'Universités allemandes de recherche (TU Munich, Heidelberg, Bonn, Berlin...)',
                'domain' => 'Sciences de l\'Ingénieur, Informatique, Santé Publique, Environnement, Économie & Gestion',
                'level' => 'Master, Doctorat',
                'deadline' => '2026-12-15',
                'description' => "Le Service allemand d'échanges académiques (DAAD) offre des bourses d'études postuniversitaires pour des cours dispensés en anglais et en allemand, axés sur les défis du développement.",
                'details' => "S'adresse tout particulièrement aux jeunes professionnels et diplômés d'Afrique et des pays du Sud ayant un fort potentiel d'impact dans leur pays d'origine.",
                'funding_type' => 'Entièrement financée',
                'benefits' => "Allocation mensuelle de 934 € pour Master et 1 300 € pour Doctorat, exonération des frais universitaires, assurance santé et responsabilité civile, indemnité forfaitaire de voyage international, allocation annuelle pour livres et matériel d'études (460 €), cours de langue allemande gratuit de plusieurs mois avant la rentrée.",
                'requirements' => "Licence ou Master complété avec mention, au moins 2 ans d'expérience professionnelle pertinente après l'obtention du diplôme, diplôme obtenu il y a moins de 6 ans, niveau d'anglais certifié (IELTS ou TOEFL) pour les cursus en anglais.",
                'required_documents' => "Formulaire DAAD signé, CV au format Europass à jour, lettre de motivation personnelle (max 2 pages), lettre de recommandation de l'employeur actuel avec attestation d'au moins 2 ans de service, diplômes et relevés de notes certifiés conformes, certificat de langue.",
                'image' => 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&auto=format&fit=crop&q=60',
                'link' => 'https://www.daad.de/en/study-and-research-in-germany/scholarships/',
                'apply_link' => 'https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/',
                'official_website' => 'https://www.daad.de/',
                'source' => 'DAAD Allemagne'
            ],
            [
                'title' => 'Erasmus Mundus Joint Masters (EMJM - Union Européenne)',
                'country' => 'Union Européenne (France, Espagne, Italie, Allemagne, Belgique...)',
                'university' => 'Consortiums d\'universités européennes de renommée mondiale',
                'domain' => 'Toutes disciplines (Intelligence Artificielle, Robotique, Droit International, Énergies Renouvelables, Sciences des Données)',
                'level' => 'Master',
                'deadline' => '2027-01-15',
                'description' => "Les Masters conjoints Erasmus Mundus sont des programmes d'études intégrés de haut niveau, conçus et dispensés par un partenariat international d'établissements d'enseignement supérieur de l'UE.",
                'details' => "L'étudiant effectue son cursus dans au moins 2 à 3 pays européens différents et reçoit un diplôme conjoint ou multiple reconnu mondialement.",
                'funding_type' => 'Entièrement financée (1 400 € / mois + Frais)',
                'benefits' => "Exonération intégrale des droits d'inscription et de laboratoire, allocation mensuelle de subsistance de 1 400 € par mois pendant toute la durée (24 mois), frais de voyage et d'installation pris en charge, assurance multirisque européenne complète.",
                'requirements' => "Être titulaire d'une Licence / Bachelor ou être en dernière année, bon niveau d'anglais (les cours sont en anglais), dossier académique solide et pertinence du projet d'études avec les objectifs du consortium choisi.",
                'required_documents' => "Relevés de notes universitaires complets, diplôme de Licence ou attestation de réussite, CV au format Europass, lettre de motivation académique, 2 lettres de recommandation de professeurs, certificat de niveau d'anglais (IELTS/TOEFL ou attestation d'études en anglais), copie du passeport.",
                'image' => 'https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?w=800&auto=format&fit=crop&q=60',
                'link' => 'https://erasmus-plus.ec.europa.eu/fr/opportunities/opportunities-for-individuals/students/erasmus-mundus-joint-masters',
                'apply_link' => 'https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en',
                'official_website' => 'https://erasmus-plus.ec.europa.eu/',
                'source' => 'Union Européenne'
            ],
            [
                'title' => 'Bourses du Gouvernement Chinois (CSC Scholarship - Type B Universités)',
                'country' => 'Chine',
                'university' => 'Tsinghua University, Peking University, Zhejiang, Fudan, Harbin Institute of Technology',
                'domain' => 'Sciences & Technologies, IA, Génie Civil, Médecine, Commerce International',
                'level' => 'Licence, Master, Doctorat',
                'deadline' => '2027-03-31',
                'description' => "Le Conseil des Bourses de Chine (CSC) offre des bourses d'études complètes aux étudiants internationaux d'Afrique pour étudier en chinois ou en anglais dans les universités chinoises de rang mondial.",
                'details' => "L'une des bourses les plus accessibles et généreuses au monde pour les étudiants africains souhaitant se spécialiser dans les technologies émergentes ou les sciences fondamentales.",
                'funding_type' => 'Entièrement financée',
                'benefits' => "Frais de scolarité 100% pris en charge, logement gratuit sur le campus universitaire, assurance médicale complète, allocation mensuelle de 3 000 RMB pour Master (~390 €) et 3 500 RMB pour Doctorat (~450 €) largement suffisante pour vivre confortablement en Chine.",
                'requirements' => "Être non-chinois et en bonne santé physique et mentale, âgé de moins de 35 ans pour le Master et moins de 40 ans pour le Doctorat, posséder le diplôme requis avec de bonnes notes.",
                'required_documents' => "Formulaire de candidature en ligne du CSC, photocopie du passeport, diplôme le plus élevé notarié, relevés de notes notariés, plan d'études ou proposition de recherche (min 800 mots), 2 lettres de recommandation de professeurs agrégés, certificat d'examen physique étranger, extrait de casier judiciaire.",
                'image' => 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&auto=format&fit=crop&q=60',
                'link' => 'https://www.campuschina.org/',
                'apply_link' => 'https://studyinchina.csc.edu.cn/',
                'official_website' => 'https://www.campuschina.org/',
                'source' => 'CSC Chine'
            ],
            [
                'title' => 'Bourses du Gouvernement Turc (Türkiye Bursları)',
                'country' => 'Turquie',
                'university' => 'Universités d\'État turques (Istanbul University, METU, Boğaziçi, ITU, Bilkent)',
                'domain' => 'Toutes disciplines',
                'level' => 'Licence, Master, Doctorat',
                'deadline' => '2027-02-20',
                'description' => "Türkiye Bursları est un programme de bourses financé par le gouvernement de la République de Turquie, conçu pour offrir un enseignement supérieur de qualité aux étudiants internationaux, avec une forte proportion d'étudiants africains.",
                'details' => "Comprend obligatoirement 1 an de cours de turc gratuit avant le début des cours (même si le cursus choisi est en anglais).",
                'funding_type' => 'Entièrement financée (Billet + Logement + Cours de langue + Argent de poche)',
                'benefits' => "Placement universitaire garanti sans frais d'inscription, hébergement gratuit en cité universitaire d'État, cours intensif de turc gratuit pendant 1 an, billet d'avion aller-retour, assurance maladie complète, allocation mensuelle.",
                'requirements' => "Pour la Licence : avoir au moins 70% de moyenne au Bac (90% pour médecine) et avoir moins de 21 ans. Pour le Master : au moins 75% de moyenne et moins de 30 ans. Pour le Doctorat : moins de 35 ans.",
                'required_documents' => "Document d'identité ou passeport valide, photo récente, diplôme ou certificat de scolarité de la dernière année, relevés de notes officiels, résultats aux examens nationaux (Bac, etc.), lettre d'intention rédigée sur la plateforme, références académiques.",
                'image' => 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&auto=format&fit=crop&q=60',
                'link' => 'https://www.turkiyeburslari.gov.tr/',
                'apply_link' => 'https://tbbs.turkiyeburslari.gov.tr/',
                'official_website' => 'https://www.turkiyeburslari.gov.tr/',
                'source' => 'Gouvernement Turc'
            ],
            [
                'title' => 'Bourses de la Banque Islamique de Développement (IsDB)',
                'country' => 'International (Universités des pays membres de l\'IsDB ou top 100 mondial)',
                'university' => 'Universités partenaires au Maroc, Turquie, Malaisie, Tunisie, France, Canada, etc.',
                'domain' => 'Médecine, Pharmacie, Ingénierie, Intelligence Artificielle, Agronomie, Énergie Verte, Économie Islamique',
                'level' => 'Licence, Master, Doctorat, Recherche Post-doctorale',
                'deadline' => '2027-02-28',
                'description' => "Le programme de bourses de la Banque Islamique de Développement (IsDB) soutient le développement du capital humain dans ses pays membres (dont plus de 25 pays africains) en formant de futurs scientifiques et innovateurs.",
                'details' => "Octroyé sous forme de don ou de prêt sans intérêt (qard hasan) remboursable après insertion professionnelle auprès d'un fonds fiduciaire local pour aider d'autres étudiants.",
                'funding_type' => 'Entièrement financée',
                'benefits' => "Frais de scolarité payés directement à l'université, allocation mensuelle de vie adaptée au coût du pays d'accueil, billets d'avion aller-retour, couverture médicale complète, allocation d'installation, allocation annuelle pour livres et vêtements.",
                'requirements' => "Être ressortissant d'un pays membre de l'IsDB (ex: Sénégal, Côte d'Ivoire, Mali, Niger, Guinée, Bénin, Burkina Faso, Togo, Gabon, Cameroun, Mauritanie, Tchad, etc.), ne pas bénéficier d'une autre bourse, être médicalement apte, très bon dossier académique.",
                'required_documents' => "Formulaire de candidature officiel de l'IsDB, diplômes et relevés de notes traduits et certifiés, CV, lettre de motivation et engagement à contribuer au développement de sa communauté, proposition de recherche détaillée (pour Master/PhD), 2 recommandations académiques.",
                'image' => 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=60',
                'link' => 'https://www.isdb.org/scholarships',
                'apply_link' => 'https://isdbscholarships.smartsimple.com/',
                'official_website' => 'https://www.isdb.org/',
                'source' => 'IsDB Banque'
            ],
            [
                'title' => 'Bourses de l\'Université Panafricaine (PAU - Union Africaine)',
                'country' => 'Cameroun, Nigéria, Algérie, Kenya',
                'university' => 'Instituts PAU (PAULESI à Ibadan, PAUGHSS à Yaoundé, PAUWES à Tlemcen, PAUSTI à Nairobi)',
                'domain' => 'Sciences Fondamentales, Énergies Renouvelables & Climat, Sciences Sociales & Gouvernance, Sciences de la Terre & Agriculture',
                'level' => 'Master, Doctorat',
                'deadline' => '2027-03-15',
                'description' => "L'Université Panafricaine est un réseau académique continental de haut niveau créé par l'Union Africaine pour revitaliser l'enseignement supérieur et la recherche de pointe en Afrique.",
                'details' => "Chaque institut thématique est hébergé dans une université d'excellence du continent, avec des enseignants et chercheurs invités du monde entier.",
                'funding_type' => 'Entièrement financée (100% Union Africaine)',
                'benefits' => "Exonération intégrale des droits d'inscription, allocation mensuelle de vie (750 $ pour Master, 1 000 $ pour Doctorat), billet d'avion pour rejoindre l'institut hôte, assurance santé étudiante, subvention pour la recherche de mémoire ou de thèse.",
                'requirements' => "Être citoyen de l'un des États membres de l'Union Africaine, avoir moins de 30 ans pour le Master et moins de 35 ans pour le Doctorat, diplôme de Licence avec mention Bien ou équivalent.",
                'required_documents' => "Copie certifiée du diplôme de Licence/Master, relevés de notes certifiés de tout le parcours universitaire, passeport national, photo d'identité, CV détaillé, lettre de motivation expliquant la pertinence des études pour l'Afrique, 2 lettres de recommandation, concept note de recherche (Master : 2 pages, PhD : 4 pages).",
                'image' => 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60',
                'link' => 'https://pau-au.africa/',
                'apply_link' => 'https://www.pau-au.africa/admissions',
                'official_website' => 'https://pau-au.africa/',
                'source' => 'Union Africaine'
            ],
            [
                'title' => 'Bourses Vanier du Canada (Doctorat d\'Excellence)',
                'country' => 'Canada',
                'university' => 'Universités canadiennes (Toronto, UBC, McGill, Montréal, Laval, Waterloo)',
                'domain' => 'Santé, Sciences Naturelles, Génie, Sciences Humaines & Sociales',
                'level' => 'Doctorat',
                'deadline' => '2026-11-01',
                'description' => "Le Programme de bourses d'études supérieures du Canada Vanier (BESC Vanier) vise à attirer et à retenir des doctorants de calibre mondial qui démontrent à la fois des compétences en leadership et un rendement exceptionnel.",
                'details' => "L'une des bourses doctorales les plus prestigieuses et lucratives en Amérique du Nord.",
                'funding_type' => 'Entièrement financée (50 000 CAD par an)',
                'benefits' => "50 000 $ CA par an pendant trois années consécutives, totale liberté d'utilisation pour les droits de scolarité, les dépenses personnelles et les frais de recherche internationale.",
                'requirements' => "Être mis en candidature par un seul établissement canadien où vous effectuez votre doctorat, avoir obtenu d'excellentes notes durant les 2 dernières années d'études à temps plein, démontrer des compétences de leadership significatives.",
                'required_documents' => "Proposition de recherche détaillée (max 2 pages), déclaration personnelle de leadership, 2 lettres de recommandation sur le leadership, 2 lettres de référence académique, relevés de notes officiels, CV complet sur le Portail de recherche canadien.",
                'image' => 'https://images.unsplash.com/photo-1517935703635-2717090c2210?w=800&auto=format&fit=crop&q=60',
                'link' => 'https://vanier.gc.ca/fr/home-accueil.html',
                'apply_link' => 'https://vanier.gc.ca/fr/nomination_process-processus_mise_en_candidature.html',
                'official_website' => 'https://vanier.gc.ca/',
                'source' => 'Gouvernement du Canada'
            ]
        ];

        foreach ($featured as $item) {
            Scholarship::updateOrCreate(
                ['title' => $item['title']],
                $item
            );
        }
    }
}
