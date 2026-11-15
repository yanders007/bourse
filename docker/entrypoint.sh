#!/bin/bash
set -e

# Configurer SQLite persistant
SQLITE_DB="/var/www/html/database/database.sqlite"
mkdir -p /var/www/html/database
if [ ! -f "$SQLITE_DB" ]; then
    touch "$SQLITE_DB"
fi
chown -R www-data:www-data /var/www/html/database /var/www/html/storage
chmod -R 777 /var/www/html/database
chmod 666 "$SQLITE_DB"

# Forcer la configuration SQLite et les drivers fichiers
export DB_CONNECTION=sqlite
export DB_DATABASE="$SQLITE_DB"
export CACHE_STORE=file
export SESSION_DRIVER=file
export QUEUE_CONNECTION=sync

# Créer ou mettre à jour .env local
touch /var/www/html/.env
sed -i '/^DB_CONNECTION=/d' /var/www/html/.env 2>/dev/null || true
sed -i '/^DB_DATABASE=/d' /var/www/html/.env 2>/dev/null || true
echo "DB_CONNECTION=sqlite" >> /var/www/html/.env
echo "DB_DATABASE=$SQLITE_DB" >> /var/www/html/.env
echo "CACHE_STORE=file" >> /var/www/html/.env
echo "SESSION_DRIVER=file" >> /var/www/html/.env

php artisan config:clear
php artisan cache:clear || true

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
