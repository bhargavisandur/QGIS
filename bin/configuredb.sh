#!/bin/bash

database="Project DB"

echo "Configuring $database"

if psql -U postgres -lqt | cut -d \| -f 1 | grep -qw appdb;
then
	dropdb -U postgres appdb
fi
createdb -U postgres appdb

psql -U postgres appdb < ./bin/sql/appdb.sql

echo "$database configured"