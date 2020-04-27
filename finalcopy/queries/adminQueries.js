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

const displayCC = (req, res) => {
    pool.query('SELECT * FROM crime_cell', (err, result) => {
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

const displayO = (req, res) => {
    pool.query('SELECT * FROM orphanage', (err, result) => {
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

const displayRescuedmale = (req, res) => {
    var sex = 'Male';
    pool.query(
        'SELECT * FROM rescued_child where "sex"=$1 ',
        [sex],
        (err, result) => {
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
        }
    );
};
const displayRescuedfemale = (req, res) => {
    var sex = 'Female';
    pool.query(
        'SELECT * FROM rescued_child where "sex"=$1 ',
        [sex],
        (err, result) => {
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
        }
    );
};
const displayRescuedpwd = (req, res) => {
    var pwd = 'yes';
    pool.query(
        'SELECT * FROM rescued_child where "pwdstat"=$1 ',
        [pwd],
        (err, result) => {
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
        }
    );
};

const displayRescuedlt5 = (req, res) => {
    var age = 5;
    pool.query(
        'SELECT * FROM rescued_child where age=$1 ',
        [age],
        (err, result) => {
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
        }
    );
};

const displayRescuedlt10 = (req, res) => {
    var age = 10;
    pool.query(
        'SELECT * FROM rescued_child where age=$1 ',
        [age],
        (err, result) => {
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
        }
    );
};

const displayRescuedlt15 = (req, res) => {
    var age = 15;
    pool.query(
        'SELECT * FROM rescued_child where age=$1 ',
        [age],
        (err, result) => {
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
        }
    );
};

const displayVic = (req, res) => {
    pool.query('SELECT * FROM victim', (err, result) => {
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

const displayVicMale = (req, res) => {
    var sex = 'Male';
    pool.query('SELECT * FROM victim WHERE "sex"=$1', [sex], (err, result) => {
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
    });
};

const displayVicFemale = (req, res) => {
    var sex = 'Female';
    pool.query('SELECT * FROM victim WHERE "sex"=$1', [sex], (err, result) => {
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
    });
};

const displayVicPwd = (req, res) => {
    var pwd = 'yes';
    pool.query(
        'SELECT * FROM victim WHERE pwdstat=$1',
        [pwd],
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

const displayViclt5 = async (req, res) => {
    var age = 5;
    pool.query(
        'SELECT * FROM victim WHERE age=$1',
        [age],
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

const displayViclt10 = async (req, res) => {
    var age = 10;
    pool.query(
        'SELECT * FROM victim WHERE age=$1',
        [age],
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

const displayViclt15 = async (req, res) => {
    var age = 15;
    pool.query(
        'SELECT * FROM victim WHERE age=$1',
        [age],
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

const displayMissingReports = (req, res) => {
    pool.query('SELECT * FROM missing_reports', (err, result) => {
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
    displayCC,
    displayO,
    displayRescuedmale,
    displayRescuedfemale,
    displayRescuedpwd,
    displayRescuedlt5,
    displayRescuedlt10,
    displayRescuedlt15,
    displayVic,
    displayVicMale,
    displayVicFemale,
    displayViclt10,
    displayViclt15,
    displayViclt5,
    displayVicPwd,
    displayMissingReports,
};
