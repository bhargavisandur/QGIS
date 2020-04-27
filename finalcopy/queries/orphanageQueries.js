const pool = require('../pool');
const utility = require('./utility');
const fs = require('fs');
const sendEmail = require('../nodeMailer/sendEmail');

const getOrphanage = (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    pool.query(
        'SELECT * FROM manager WHERE "password" = $2 and "email" = $1',
        [email, password],
        (error, result) => {
            if (error) throw error;
            else {
                console.log(result, result.rows);
                if (result.rows.length == 0) {
                    console.log(result.rows);
                    res.redirect('/loginOrphanage');
                } else {
                    res.redirect('/orphanagePage/' + result.rows[0].id);
                }
                //console.log(result);
            }
            //res.writeContinue(200, { success: true });
        }
    );
};

const displayMap = (req, res) => {
    var victimLat = req.params.victimLat;
    var victimLng = req.params.victimLng;

    var orphanageID = req.params.orphanageID;
    pool.query(
        'SELECT * FROM orphanage WHERE id=$1',
        [orphanageID],
        (error, result) => {
            if (error) throw error;
            let orphanLat = result.rows[0].lat;
            let orphanLng = result.rows[0].lng;
            console.log(orphanLat + ' ' + orphanLng);
            res.render('map', {
                vlat: victimLat,
                vlng: victimLng,
                olat: orphanLat,
                olng: orphanLng,
            });
        }
    );
};

const rescuedbyMe = async (req, res) => {
    var orphanageID = req.params.orphanageID;
    console.log(orphanageID);
    pool.query(
        'SELECT * FROM rescued_child WHERE oid=$1',
        [orphanageID],
        async (err, result) => {
            if (err) throw err;
            else {
                let res1 = await pool.query(
                    'SELECT count(*) FROM rescued_child where oid=$1',
                    [orphanageID]
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
    var orphanageID = req.params.orphanageID;
    console.log(orphanageID);
    pool.query(
        'SELECT * FROM rescued_child WHERE oid=$1',
        [orphanageID],
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

const rescuedMale = async (req, res) => {
    var orphanageID = req.params.orphanageID;

    var sex = 'Male';
    pool.query(
        'SELECT * FROM rescued_child WHERE oid=$1 and "sex"=$2',
        [orphanageID, sex],
        async (err, result) => {
            if (err) throw err;
            else {
                let res1 = await pool.query(
                    'SELECT count(*) FROM rescued_child WHERE "sex"=$1 and oid=$2 ',
                    [sex, orphanageID]
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
    var orphanageID = req.params.orphanageID;
    var sex = 'Male';
    pool.query(
        'SELECT * FROM rescued_child WHERE oid=$1 and "sex"=$2',
        [orphanageID, sex],
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

const rescuedFemale = async (req, res) => {
    var orphanageID = req.params.orphanageID;
    console.log('oid:' + orphanageID);
    var sex = 'Female';
    pool.query(
        'SELECT * FROM rescued_child WHERE oid=$1 and "sex"=$2',
        [orphanageID, sex],
        async (err, result) => {
            if (err) throw err;
            else {
                let res1 = await pool.query(
                    'SELECT count(*) FROM rescued_child WHERE "sex"=$1 and oid=$2 ',
                    [sex, orphanageID]
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
    var orphanageID = req.params.orphanageID;
    console.log('ccid:' + orphanageID);
    var sex = 'Female';
    pool.query(
        'SELECT * FROM rescued_child WHERE oid=$1 and "sex"=$2',
        [orphanageID, 'Female'],
        (err, result) => {
            if (err) throw err;
            // console.log(result.rows);
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
    var orphanageID = req.params.orphanageID;
    var pwd = 'yes';
    console.log(orphanageID);
    pool.query(
        'SELECT * FROM rescued_child WHERE oid=$1 and pwdstat=$2',
        [orphanageID, pwd],
        async (err, result) => {
            if (err) throw err;
            else {
                let res1 = await pool.query(
                    'SELECT count(*) FROM rescued_child WHERE "pwdstat"=$1 and oid=$2 ',
                    [pwd, orphanageID]
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
    var orphanageID = req.params.orphanageID;
    var pwd = 'yes';
    console.log(orphanageID);
    pool.query(
        'SELECT * FROM rescued_child WHERE oid=$1 and pwdstat=$2',
        [orphanageID, pwd],
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
    var orphanageID = req.params.orphanageID;
    var age = 5;
    console.log(orphanageID);
    pool.query(
        'SELECT * FROM rescued_child WHERE oid=$1 and age=$2',
        [orphanageID, age],
        async (err, result) => {
            if (err) throw err;
            else {
                let res1 = await pool.query(
                    'SELECT count(*) FROM rescued_child WHERE age=$1 and oid=$2 ',
                    [age, orphanageID]
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

const rescuedlt5map = async (req, res) => {
    var orphanageID = req.params.orphanageID;
    var age = 5;
    console.log(orphanageID);
    pool.query(
        'SELECT * FROM rescued_child WHERE oid=$1 and age=$2',
        [orphanageID, age],
        async (err, result) => {
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

const rescuedlt10 = async (req, res) => {
    var orphanageID = req.params.orphanageID;
    var age = 10;
    console.log(orphanageID);
    pool.query(
        'SELECT * FROM rescued_child WHERE oid=$1 and age=$2',
        [orphanageID, age],
        async (err, result) => {
            if (err) throw err;
            else {
                let res1 = await pool.query(
                    'SELECT count(*) FROM rescued_child WHERE age=$1 and oid=$2 ',
                    [age, orphanageID]
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

const rescuedlt10map = async (req, res) => {
    var orphanageID = req.params.orphanageID;
    var age = 10;
    console.log(orphanageID);
    pool.query(
        'SELECT * FROM rescued_child WHERE oid=$1 and age=$2',
        [orphanageID, age],
        async (err, result) => {
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

const rescuedlt15 = async (req, res) => {
    var orphanageID = req.params.orphanageID;
    var age = 15;
    console.log(orphanageID);
    pool.query(
        'SELECT * FROM rescued_child WHERE oid=$1 and age=$2',
        [orphanageID, age],
        async (err, result) => {
            if (err) throw err;
            else {
                let res1 = await pool.query(
                    'SELECT count(*) FROM rescued_child WHERE age=$1 and oid=$2 ',
                    [age, orphanageID]
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
const rescuedlt15map = async (req, res) => {
    var orphanageID = req.params.orphanageID;
    var age = 15;
    console.log(orphanageID);
    pool.query(
        'SELECT * FROM rescued_child WHERE oid=$1 and age=$2',
        [orphanageID, age],
        async (err, result) => {
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

const myVicMap = (req, res) => {
    var orphanageID = req.params.orphanageID;
    console.log(orphanageID);
    pool.query(
        'SELECT * FROM victim WHERE oid=$1',
        [orphanageID],
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

const vicMaleMap = (req, res) => {
    var orphanageID = req.params.orphanageID;
    var sex = 'Male';
    pool.query(
        'SELECT * FROM victim WHERE oid=$1 and "sex"=$2',
        [orphanageID, sex],
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

const vicFemaleMap = (req, res) => {
    var orphanageID = req.params.orphanageID;
    console.log('ccid:' + orphanageID);
    var sex = 'Female';
    pool.query(
        'SELECT * FROM victim WHERE oid=$1 and "sex"=$2',
        [orphanageID, 'Female'],
        (err, result) => {
            if (err) throw err;
            // console.log(result.rows);
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

const vicPwdMap = (req, res) => {
    var orphanageID = req.params.orphanageID;
    var pwd = 'yes';
    console.log(orphanageID);
    pool.query(
        'SELECT * FROM victim WHERE oid=$1 and pwdstat=$2',
        [orphanageID, pwd],
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

const viclt5map = async (req, res) => {
    var orphanageID = req.params.orphanageID;
    var age = 5;
    console.log(orphanageID);
    pool.query(
        'SELECT * FROM victim WHERE oid=$1 and age=$2',
        [orphanageID, age],
        async (err, result) => {
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

const viclt10map = async (req, res) => {
    var orphanageID = req.params.orphanageID;
    var age = 10;
    console.log(orphanageID);
    pool.query(
        'SELECT * FROM victim WHERE oid=$1 and age=$2',
        [orphanageID, age],
        async (err, result) => {
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

const viclt15map = async (req, res) => {
    var orphanageID = req.params.orphanageID;
    var age = 15;
    console.log(orphanageID);
    pool.query(
        'SELECT * FROM victim WHERE oid=$1 and age=$2',
        [orphanageID, age],
        async (err, result) => {
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

module.exports = {
    getOrphanage,
    displayMap,
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
    rescuedlt5map,
    rescuedlt10map,
    rescuedlt15map,
    myVicMap,
    vicFemaleMap,
    viclt10map,
    viclt15map,
    viclt5map,
    vicMaleMap,
    vicPwdMap,
};
