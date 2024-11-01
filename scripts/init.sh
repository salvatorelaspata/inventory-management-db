#!/bin/sh
# scripts/init.sh

# Aspetta che il database sia pronto
echo "Waiting for database to be ready..."
while ! nc -z db 5432; do
  sleep 1
done

echo "Database is ready!"

# Esegui le migrazioni
echo "Running migrations..."
npm run drizzle:migrate

# Se siamo in development, esegui anche il seed
if [ "$NODE_ENV" = "development" ]; then
  echo "Running seeds..."
  npm run drizzle:seed
fi

echo "Database initialization completed!"