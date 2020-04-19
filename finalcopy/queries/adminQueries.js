const pool = require("../pool");
const utility = require("./utility");

const createAdmin = (req, res) => {
    const { name, contact, email, password } = req.body;
    pool.query(
        "INSERT INTO admin (name,email,contact,password) values($1,$2,$3,$4)",
        [name, email, contact, password],
        (error, result) => {
            if (error) throw error;
            res.writeContinue(200, { success: true });
        }
    );
    pool.query("SELECT * FROM admin", (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
    });
};

const createOrphan = async (req, res) => {
    const { name, address, capacity } = req.body;
    let location;
    location = await utility.tolatlong(address);

    pool.query(
        "INSERT into orphanage (name,address,capacity) values($1,$2,$3)",
        [name, location, capacity],
        (error, result) => {
            if (error) throw error;
            res.writeContinue(200, { success: true });
        }
    );
    pool.query("SELECT * FROM orphanage", (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
    });
};

const createCrimeCell = async (req, res) => {
    const { name, region } = req.body;
    let location;
    location = await utility.tolatlong(region);
    pool.query(
        "INSERT into crime_cell (name,region) VALUES ($1,$2)",
        [name, location],
        (error, result) => {
            if (error) throw error;
            res.writeContinue(200, { success: true });
        }
    );
    pool.query("SELECT * FROM crime_cell", (error, result) => {
        if (error) throw error;
        res.status(200).json(result.rows);
    });
};

module.exports = { createAdmin, createOrphan, createCrimeCell };
