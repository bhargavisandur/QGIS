const express = require('express');
const bodyParser = require('body-parser');
const db=require('./queries/adminQueries')
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' });
});

app.post('/admin', db.createAdmin);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
});