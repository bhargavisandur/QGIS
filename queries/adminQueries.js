const pool = require('../pool');

const createAdmin = (req, res) => {
    const { name, contact, email } = req.body;
    pool.query(
        'INSERT INTO admin (name,email,contact) values($1,$2,$3)', 
        [name, email, contact], 
        (error, result) => {
            if(error)
                throw error
            res.status(200).send(`Admin added with id:${result.insertId}`);

    })
    pool.query('SELECT * FROM admin', (error, result) => {
        if(error) throw error
        res.status(200).json(result.rows)
    })
}
module.exports = {createAdmin};