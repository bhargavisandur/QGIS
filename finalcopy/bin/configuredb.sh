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