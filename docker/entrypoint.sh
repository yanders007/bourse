#!/bin/bash
set -e

php artisan config:clear

# -----------------------------------------------------------------
# No DB migrations – using SQLite (in‑memory or file)
# -----------------------------------------------------------------
# php artisan migrate --force      # removed
# php artisan migrate --force      # removed (second occurrence)

php artisan config:cache
php artisan route:cache

# Seeders – work with SQLite
php artisan db:seed --class=AdminSeeder --force || true
php artisan db:seed --class=CvTemplateSeeder --force || true
php artisan db:seed --class=ScholarshipSeeder --force || true

JSON_FILE="/var/www/scraper/storage/scholarships.json"

if [ -f "$JSON_FILE" ]; then
    echo "Importation des bourses en cours"
    php artisan scholarships:import "$JSON_FILE" \
        || echo "L'import a rencontré des avertissements, mais le serveur continue de démarrer."
else
    echo "Fichier introuvable : $JSON_FILE"
fi

php artisan config:cache
php artisan route:cache

exec supervisord -c /etc/supervisord.conf
