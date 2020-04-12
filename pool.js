const Pool = require("pg").Pool;

const pool = new Pool({
    user: "me",
    host: "localhost",
    database: "appdb",
    password: "mypass123",
    port: 5432,
});

module.exports = pool;
