# qgis

Database is made using postgres
### To configure database
1. Install postgres on local system.
2. Execute command `npm run configure`.

### To add test values
Execute command `npm test`.<br>
If the above line thorws an error then make `testvalues.sh` executable.
1. Go into the directory bin.
2. Execute command `chmod +x testvalues.sh`.
3. Go to the root directory and try the command again.

### To start server
1. Run the command `npm install` to install all the necessary modules.
2. Run `npm run dev` to start server on development mode which uses nodemon.
3. Server can be started using `npm start` which will start it using node and not nodemon.
4. Since frontend is not yet ready use postman to make queries.
