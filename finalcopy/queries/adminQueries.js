const pool = require('../pool');
const utility = require('./utility');

const createAdmin = (req, res) => {
    const { name, contact, email, password } = req.body;
    pool.query(
        'INSERT INTO admin (name,email,contact,password) values($1,$2,$3,$4)',
        [name, email, contact, password],
        (error, result) => {
            if (error) throw error;
            res.writeContinue(200, { success: true });
        }
    );
    pool.query('SELECT * FROM admin', (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
    });
};

const getAdmin = (req, res) => {
    const { username, password } = req.body;
    // console.log(req.body);
    // console.log(username, password);
    pool.query(
        'SELECT * FROM admin WHERE "password" = $1 AND "email" = $2',
        [password, username],
        (error, result) => {
            if (error) throw error;
            else {
                console.log(result.rows);
                if (result.rows.length == 0) {
                    res.redirect('/adminLogin');
                } else {
                    res.redirect('/statistics');
                }
                //console.log(result);
            }
            //res.writeContinue(200, { success: true });
        }
    );
};

const createOrphan = async (req, res) => {
    const { name, address, capacity } = req.body;
    let location;
    location = await utility.tolatlong(address);

    pool.query(
        'INSERT into orphanage (name,address,capacity) values($1,$2,$3)',
        [name, location, capacity],
        (error, result) => {
            if (error) throw error;
            res.writeContinue(200, { success: true });
        }
    );
    pool.query('SELECT * FROM orphanage', (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
    });
};

const createCrimeCell = async (req, res) => {
    const { name, region } = req.body;
    let location;
    location = await utility.tolatlong(region);
    pool.query(
        'INSERT into crime_cell (name,region) VALUES ($1,$2)',
        [name, location],
        (error, result) => {
            if (error) throw error;
            res.writeContinue(200, { success: true });
        }
    );
    pool.query('SELECT * FROM crime_cell', (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
    });
};

const displayRescued = (req, res) => {
    pool.query('SELECT * FROM rescued_child', (err, result) => {
        if (err) throw err;
        console.log(result.rows);
        var rescue = [];
        for (var i = 0; i < result.rows.length; i++) {
            const obj = {
                lat: result.rows[i].lat,
                lng: result.rows[i].lng,
            };
            rescue.push(obj);
        }
        res.render('rescue_map', { rescue: rescue });
    });
};

module.exports = {
    createAdmin,
    createOrphan,
    createCrimeCell,
    displayRescued,
    getAdmin,
};
