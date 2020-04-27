#!/bin/bash

echo "Complete reconfiguration of table"
npm run configure

echo "Adding Test Data"
psql -U me appdb <./bin/sql/TestData.sql