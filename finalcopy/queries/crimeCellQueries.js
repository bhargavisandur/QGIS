const pool = require('../pool');
const utility = require('./utility');
const fs = require('fs');
const sendEmail = require('../nodeMailer/sendEmail');

const getCrimeCell = (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    pool.query(
        'SELECT * FROM crime_cell WHERE "password" = $2 and "email" = $1',
        [email, password],
        (error, result) => {
            if (error) throw error;
            else {
                console.log(result, result.rows);
                if (result.rows.length == 0) {
                    console.log(result.rows);
                    res.redirect('/loginCrimeCell');
                } else {
                    res.redirect('/crimeCellPage/' + result.rows[0].id);
                }
                //console.log(result);
            }
            //res.writeContinue(200, { success: true });
        }
    );
};

const displayCrime = (req, res) => {
    var victimLat = req.params.victimLat;
    var victimLng = req.params.victimLng;
    var crimecellID = req.params.crimecellID;
    pool.query(
        'SELECT * FROM crime_cell WHERE id=$1 ',
        [crimecellID],
        (error, result) => {
            if (error) throw error;
            cclat = result.rows[0].lat;
            cclng = result.rows[0].lng;
            console.log(cclat, cclng);
            res.render('crime_map', {
                vlat: victimLat,
                vlng: victimLng,
                clat: cclat,
                clng: cclng,
            });
        }
    );
};
const rescuedbyMe = async (req, res) => {
    var crimecellId = req.params.crimecellId;
    console.log(crimecellId);
    pool.query(
        'SELECT * FROM rescued_child WHERE ccid=$1',
        [crimecellId],
        async (err, result) => {
            if (err) throw err;
            else {
                let res1 = await pool.query(
                    'SELECT count(*) FROM rescued_child where ccid=$1',
                    [crimecellId]
                );
                let cnt = res1.rows[0].count;
                let str = 'The total number of rescued children is: ' + cnt;
                var victims = result.rows;
                console.log(victims);
                res.render('rescuedPage', { victims: victims, str: str });
            }
        }
    );
};

const rescuedbyMeMap = (req, res) => {
    var crimeCellId = req.params.crimeCellId;
    console.log('crimecellid is:' + crimeCellId);
    pool.query(
        'SELECT * FROM rescued_child WHERE ccid=$1',
        [crimeCellId],
        (err, result) => {
            if (err) throw err;
            rescue = [];
            result.rows.forEach((r) => {
                obj = {
                    lat: r.lat,
                    lng: r.lng,
                };
                rescue.push(obj);
            });
            res.render('rescue_map', { rescue: rescue });
        }
    );
};

const rescuedMale = async (req, res) => {
    var crimecellId = req.params.crimecellId;

    var sex = 'Male';
    pool.query(
        'SELECT * FROM rescued_child WHERE ccid=$1 and "sex"=$2',
        [crimecellId, sex],
        async (err, result) => {
            if (err) throw err;
            else {
                let res1 = await pool.query(
                    'SELECT count(*) FROM rescued_child WHERE "sex"=$1 and ccid=$2 ',
                    [sex, crimecellId]
                );
                let cnt = res1.rows[0].count;
                let str = 'The total number of rescued males is: ' + cnt;
                var victims = result.rows;
                console.log(victims);
                res.render('rescuedPage', { victims: victims, str: str });
            }
        }
    );
};

const rescuedMaleMap = (req, res) => {
    var crimeCellId = req.params.crimeCellId;
    var sex = 'Male';
    pool.query(
        'SELECT * FROM rescued_child WHERE ccid=$1 and "sex"=$2',
        [crimeCellId, sex],
        (err, result) => {
            if (err) throw err;
            rescue = [];
            result.rows.forEach((r) => {
                obj = {
                    lat: r.lat,
                    lng: r.lng,
                };
                rescue.push(obj);
            });
            res.render('rescue_map', { rescue: rescue });
        }
    );
};

const rescuedFemale = async (req, res) => {
    var crimecellId = req.params.crimecellId;
    console.log('oid:' + crimecellId);
    var sex = 'Female';
    pool.query(
        'SELECT * FROM rescued_child WHERE ccid=$1 and "sex"=$2',
        [crimecellId, sex],
        async (err, result) => {
            if (err) throw err;
            else {
                let res1 = await pool.query(
                    'SELECT count(*) FROM rescued_child WHERE "sex"=$1 and ccid=$2 ',
                    [sex, crimecellId]
                );
                let cnt = res1.rows[0].count;
                let str = 'The total number of rescued females is: ' + cnt;
                // console.log(result.rows);
                var victims = result.rows;
                console.log('females rescued are:' + victims);
                res.render('rescuedPage', { victims: victims, str: str });
            }
        }
    );
};

const rescuedFemaleMap = (req, res) => {
    var crimeCellId = req.params.crimeCellId;
    var sex = 'Female';
    pool.query(
        'SELECT * FROM rescued_child WHERE ccid=$1 and "sex"=$2',
        [crimeCellId, sex],
        (err, result) => {
            if (err) throw err;
            rescue = [];
            result.rows.forEach((r) => {
                obj = {
                    lat: r.lat,
                    lng: r.lng,
                };
                rescue.push(obj);
            });
            console.log(rescue);
            res.render('rescue_map', { rescue: rescue });
        }
    );
};

const rescuedPwd = async (req, res) => {
    var crimecellId = req.params.crimecellId;
    var pwd = 'yes';
    console.log(crimecellId);
    pool.query(
        'SELECT * FROM rescued_child WHERE ccid=$1 and pwdstat=$2',
        [crimecellId, pwd],
        async (err, result) => {
            if (err) throw err;
            else {
                let res1 = await pool.query(
                    'SELECT count(*) FROM rescued_child WHERE "pwdstat"=$1 and ccid=$2 ',
                    [pwd, crimecellId]
                );
                let cnt = res1.rows[0].count;
                let str = 'The total number of PWD rescued is: ' + cnt;
                var victims = result.rows;
                console.log(victims);
                res.render('rescuedPage', { victims: victims, str: str });
            }
        }
    );
};

const rescuedPwdMap = (req, res) => {
    var crimeCellId = req.params.crimeCellId;
    var pwd = 'yes';
    console.log('crimecellid is:' + crimeCellId);
    pool.query(
        'SELECT * FROM rescued_child WHERE ccid=$1 and pwdstat=$2',
        [crimeCellId, pwd],
        (err, result) => {
            if (err) throw err;
            rescue = [];
            result.rows.forEach((r) => {
                obj = {
                    lat: r.lat,
                    lng: r.lng,
                };
                rescue.push(obj);
            });
            console.log(rescue);
            res.render('rescue_map', { rescue: rescue });
        }
    );
};

const rescuedlt5 = async (req, res) => {
    var crimecellId = req.params.crimecellId;
    var age = 5;
    console.log(crimecellId);
    pool.query(
        'SELECT * FROM rescued_child WHERE ccid=$1 and age=$2',
        [crimecellId, age],
        async (err, result) => {
            if (err) throw err;
            else {
                let res1 = await pool.query(
                    'SELECT count(*) FROM rescued_child WHERE age=$1 and ccid=$2 ',
                    [age, crimecellId]
                );
                let cnt = res1.rows[0].count;
                let str =
                    'The total number of rescued with age less than 5 is: ' +
                    cnt;

                var victims = result.rows;
                console.log(`victims:${victims}`);
                res.render('rescuedPage', { victims: victims, str: str });
            }
        }
    );
};

const rescuedlt10 = async (req, res) => {
    var crimecellId = req.params.crimecellId;
    var age = 10;
    console.log(crimecellId);
    pool.query(
        'SELECT * FROM rescued_child WHERE ccid=$1 and age=$2',
        [crimecellId, age],
        async (err, result) => {
            if (err) throw err;
            else {
                let res1 = await pool.query(
                    'SELECT count(*) FROM rescued_child WHERE age=$1 and ccid=$2 ',
                    [age, crimecellId]
                );
                let cnt = res1.rows[0].count;
                let str =
                    'The total number of rescued with age between 10 and 15 is: ' +
                    cnt;
                var victims = result.rows;
                console.log(victims);
                res.render('rescuedPage', { victims: victims, str: str });
            }
        }
    );
};

const rescuedlt15 = async (req, res) => {
    var crimecellId = req.params.crimecellId;
    var age = 15;
    console.log(crimecellId);
    pool.query(
        'SELECT * FROM rescued_child WHERE ccid=$1 and age=$2',
        [crimecellId, age],
        async (err, result) => {
            if (err) throw err;
            else {
                let res1 = await pool.query(
                    'SELECT count(*) FROM rescued_child WHERE age=$1 and ccid=$2 ',
                    [age, crimecellId]
                );
                let cnt = res1.rows[0].count;
                let str =
                    'The total number of rescued with age greater than equal to 15 is: ' +
                    cnt;
                var victims = result.rows;
                console.log(victims);
                res.render('rescuedPage', { victims: victims, str: str });
            }
        }
    );
};

module.exports = {
    getCrimeCell,
    displayCrime,
    rescuedbyMe,
    rescuedbyMeMap,
    rescuedMale,
    rescuedMaleMap,
    rescuedFemale,
    rescuedFemaleMap,
    rescuedPwd,
    rescuedPwdMap,
    rescuedlt5,
    rescuedlt10,
    rescuedlt15,
};
