const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries/combinedQueries');
const multer = require('./multipart');
const app = express();
const port = 3000;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(
	bodyParser.urlencoded({
		limit: '50mb',
		extended: true,
		parameterLimit: 50000
	})
);

app.get('/', (req, res) => {
	res.json({ info: 'Node.js, Express, and Postgres API' });
});

app.post('/admin', db.createAdmin);

app.post('/users/:id', multer, db.addVictimData);

app.post('/addorphan', db.createOrphan);
app.post('/addcrime_cell', db.createCrimeCell);
app.post('/signup', db.createUser);
app.get('/login', db.getUser);

app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
});
