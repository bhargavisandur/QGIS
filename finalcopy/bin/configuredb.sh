#!/bin/bash

database="Project DB"

if psql -U postgres -t -c '\du' | cut -d \| -f 1 | grep -qw me;
then
	echo "Role 'me' already exists with password 'password'"
else
	psql -U postgres -c "CREATE USER me WITH SUPERUSER PASSWORD 'password';"
	echo "Created role 'me' with password 'password'"
fi

echo "Configuring $database"

if psql -U postgres -lqt | cut -d \| -f 1 | grep -qw appdb;
then
	dropdb -U me appdb
fi
createdb -U me appdb

psql -U me appdb < ./bin/sql/appdb.sql

echo "$database configured"

echo "Populating database"

orphanagePath=$(locate orphanage-data.csv)
psql -U me appdb -c "\copy orphanage FROM '$orphanagePath' csv;"
crimeCellPath=$(locate crime-cell-data.csv)
psql -U me appdb -c "\copy crime_cell FROM '$crimeCellPath' csv;"
managerPath=$(locate orphanage-manager.csv)
psql -U me appdb -c "\copy manager FROM '$managerPath' csv;"
adminPath=$(locate admin.csv)
psql -U me appdb -c "\copy admin FROM '$adminPath' csv;"

echo "Database populated"