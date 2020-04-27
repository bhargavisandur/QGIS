#!/bin/bash

database="Project DB"

if psql -U postgres -t -c '\du' | cut -d \| -f 1 | grep -qw me; then
	echo "Role 'me' already exists with password 'password'"
else
	psql -U postgres -c "CREATE USER me WITH SUPERUSER PASSWORD 'password';"
	echo "Created role 'me' with password 'password'"
fi

echo "Configuring $database"

if psql -U postgres -lqt | cut -d \| -f 1 | grep -qw appdb; then
	echo "Droping $database"
	dropdb -U me appdb
fi
echo "Recreating $database"
createdb -U me appdb

echo "Adding tables to $database"
psql -U me appdb <./bin/sql/appdb.sql

echo "Populating database"

echo "Adding admin data"
psql -U me appdb <./bin/sql/admin.sql
echo "Adding crime cell data"
psql -U me appdb <./bin/sql/crime-cell.sql
echo "Adding orphanage data"
psql -U me appdb <./bin/sql/orphanage.sql
echo "Adding orphanage manager data"
psql -U me appdb <./bin/sql/manager.sql
echo "Database populated"

echo "Adding triggers"
psql -U me appdb <./bin/sql/trigger.sql
echo "Added trigger"

echo "$database configured"
