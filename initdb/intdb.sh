#!/bin/sh
set -e
export PGPASSWORD=$POSTGRES_PASSWORD;
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  BEGIN;
    CREATE TABLE apartment(
                                 id SERIAL PRIMARY KEY NOT NULL,
                                 title VARCHAR(255),
                                 image VARCHAR(255)
    );
  COMMIT;
EOSQL

