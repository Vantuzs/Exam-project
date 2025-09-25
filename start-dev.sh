#!/usr/bin/env bash

#################################
## Run application in DEV mode ##
#################################

started_at=$(date +"%s")

echo "-----> Building & starting containers"
docker compose --file docker-compose-dev.yaml up -d --build
echo ""

# Find container ID.
DB_CONTAINER=$(docker compose -f docker-compose-dev.yaml ps -q db-dev)
SERVER_CONTAINER=$(docker compose -f docker-compose-dev.yaml ps -q server-dev)

if [ -z "$DB_CONTAINER" ] || [ -z "$SERVER_CONTAINER" ]; then
  echo "Couldn't find any containers. Please check docker-compose-dev.yaml"
  exit 1
fi

# We're waiting for Postgres to become available.
echo "-----> Waiting for Postgres to be ready..."
until docker exec "$DB_CONTAINER" pg_isready -U postgres > /dev/null 2>&1; do
  sleep 2
  echo "Still waiting..."
done
echo "Postgres is ready!"
echo ""

# Run Sequalize's migrations.
echo "-----> Running application migrations"
docker exec "$SERVER_CONTAINER" npx sequelize db:migrate
echo ""

# Run Sequalize's seeds.
echo "-----> Running application seeds"
docker exec "$SERVER_CONTAINER" npx sequelize db:seed:all
echo "<----- Seeds created"
echo ""

ended_at=$(date +"%s")

minutes=$(((ended_at - started_at) / 60))
seconds=$(((ended_at - started_at) % 60))

echo "-----> Done in ${minutes}m${seconds}s"
