#!/bin/bash

export DOCKER_BUILDKIT=1
export BUILDKIT_INLINE_CACHE=1
export COMPOSE_DOCKER_CLI_BUILD=1

# CREATE ENV FILE IF NOT EXIST
test -f "server/.env" || cp "server/.env.example" "server/.env"

# BUILD AND MOUNT DOCKER IMAGES
docker-compose up --build --remove-orphans --detach --force-recreate

# CREATE APP DATABASE IF NOT EXIST
docker-compose exec database timeout 150 bash -c 'until /opt/mssql-tools/bin/sqlcmd -l 60 -S localhost -U SA -P "P@ssword!" -Q "IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = '\''app'\'') BEGIN CREATE DATABASE app END"; do sleep 1; done'

# INSTALL DEPENDENCIES
docker-compose exec server composer install

# RUN MIGRATIONS WITH SEED
docker-compose exec server php artisan migrate --seed
