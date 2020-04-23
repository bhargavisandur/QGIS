const pool = require('../pool');
const utility = require('./utility');
const fs = require('fs');
const sendEmail = require('../nodeMailer/sendEmail');

const getOrphanage = (req, res) => {
    const { email, password } = req.body;
    pool.query(
        'SELECT * FROM crime_cell WHERE "password" = $2 and "email" = $1',
        [email, password],
        (error, result) => {
            if (error) throw error;
            else {
                if (result.rows.length == 0) {
                    res.redirect('/loginCrimeCell');
                } else {
                    res.redirect('/orphanagePage/' + result.rows[0].id);
                }
                //console.log(result);
            }
            //res.writeContinue(200, { success: true });
        }
    );
};

module.exports = { getOrphanage };
