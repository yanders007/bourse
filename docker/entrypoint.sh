#!/bin/bash
set -e

# Configurer SQLite
SQLITE_DB="/var/www/html/database/database.sqlite"
mkdir -p /var/www/html/database
if [ ! -f "$SQLITE_DB" ]; then
    touch "$SQLITE_DB"
fi
chown -R www-data:www-data /var/www/html/database
chmod -R 775 /var/www/html/database

php artisan config:clear

# Exécuter les migrations SQLite
php artisan migrate --force

# Seeders
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
