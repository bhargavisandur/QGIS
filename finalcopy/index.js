const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries/combinedQueries');
const multer = require('./multipart');
const app = express();
const port = 8000;
const ejs = require('ejs');
const os = require('os');

//*******************addition by bs************/
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const flash = require('connect-flash');
const passport = require('passport');
const request = require('request');
const session = require('express-session');
const path = require('path');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('./pool');
const sendEmail = require(__dirname + '/nodeMailer/sendEmail');
app.use(require('cookie-parser')());

const expressSession = require('express-session');
app.use(expressSession({ secret: 'mySecretKey' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(session({ secret: 'keyboard cat' }));

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(
    bodyParser.urlencoded({
        limit: '50mb',
        extended: true,
        parameterLimit: 50000,
    })
);

app.get('/', (req, res) => {
    //res.json({ info: "Node.js, Express, and Postgres API" });
    res.render('home');
});

// Get ip address of the connected wifi
const ifaces = os.networkInterfaces();
let address = '';
Object.keys(ifaces).forEach((ifname) => {
    let alias = 0;
    ifaces[ifname].forEach((iface) => {
        if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
        }
        if (alias >= 1) {
            // this single interface has multiple ipv4 addresses
            // console.log(ifname + ':' + alias, iface.address);
            // This contains multiple values like ethernet and all
        } else {
            // this interface has only one ipv4 adress
            // console.log(ifname, iface.address);
            address = iface.address;
        }
        ++alias;
    });
});

// app.get('/userLogin', function (req, res, next) {
//     if (req.isAuthenticated()) {
//         //res.redirect("/users/"+req.user[0].id)
//         res.redirect('/victimform');
//     } else {
//         res.render('userLogin');
//     }
// });

// app.post(
//     '/userLogin',
//     passport.authenticate('local', {
//         successRedirect: '/victimform',
//         failureRedirect: '/userLogin',
//         failureFlash: true,
//     }),
//     function (req, res) {
//         console.log(req.user);
//         // if (req.body.remember) {
//         // req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
//         // } else {
//         // req.session.cookie.expires = false; // Cookie expires at end of session
//         // }
//         res.redirect('/');
//     }
// );

//*******************sejal route********************* */

app.get('/victimform', (req, res) => {
    // if (req.isAuthenticated()) {
    //res.redirect("/users/"+req.user[0].id)
    //res.render('victimform', { userId: req.user[0].id });
    // } else {
    //     res.redirect('/userLogin');
    // }
    res.render('victimform');
});

app.post('/victimform', multer, db.addVictimData);

//******************************************** */

// app.get('/userRegister', (req, res) => {
//     res.render('userRegister');
// });

// app.post('/userRegister', async function (req, res) {
//     console.log(req.body.name);

//     try {
//         const client = await pool.connect();
//         await client.query('BEGIN');
//         var pwd = await bcrypt.hash(req.body.password, 5);
//         await JSON.stringify(
//             client.query(
//                 'SELECT id FROM users WHERE email=$1',
//                 [req.body.email],
//                 function (err, result) {
//                     if (result.rows[0]) {
//                         req.flash('warning');
//                         res.redirect('/userRegister');
//                     } else {
//                         client.query(
//                             'INSERT INTO users (id, name, contact, password, email) VALUES ($1, $2, $3, $4, $5)',
//                             [
//                                 uuidv4(),
//                                 req.body.name,
//                                 parseInt(req.body.contact),
//                                 req.body.password,
//                                 req.body.email,
//                             ],
//                             function (err, result) {
//                                 if (err) {
//                                     console.log(err);
//                                 } else {
//                                     client.query('COMMIT');
//                                     console.log(result);
//                                     req.flash('success', 'User created.');
//                                     res.redirect('/userLogin');
//                                     return;
//                                 }
//                             }
//                         );
//                     }
//                 }
//             )
//         );
//         client.release();
//     } catch (e) {
//         throw e;
//     }
// });

// app.get('/logout', function (req, res) {
//     console.log(req.isAuthenticated());
//     req.logout();
//     console.log(req.isAuthenticated());
//     req.flash('success', 'Logged out. See you soon!');
//     res.redirect('/');
// });

// passport.use(
//     'local',
//     new LocalStrategy(
//         { passReqToCallback: true },
//         (req, username, password, done) => {
//             loginAttempt();
//             async function loginAttempt() {
//                 const client = await pool.connect();
//                 try {
//                     await client.query('BEGIN');
//                     var currentAccountsData = await JSON.stringify(
//                         client.query(
//                             'SELECT id, name, email, password FROM users WHERE email=$1',
//                             [username],
//                             function (err, result) {
//                                 if (err) {
//                                     console.log(err);
//                                     return done(err);
//                                 }
//                                 if (result.rows[0] == null) {
//                                     console.log(
//                                         'wrong credentials(no email found)'
//                                     );
//                                     req.flash(
//                                         'danger',
//                                         'Oops. Incorrect login details.'
//                                     );
//                                     return done(null, false);
//                                 } else {
//                                     console.log('email found');
//                                     bcrypt.compare(
//                                         password,
//                                         result.rows[0].password,
//                                         function (err, check) {
//                                             if (err) {
//                                                 console.log(
//                                                     'Error while checking password'
//                                                 );
//                                                 return done();
//                                             } else {
//                                                 if (
//                                                     password ===
//                                                     result.rows[0].password
//                                                 ) {
//                                                     console.log(
//                                                         'password match'
//                                                     );
//                                                     return done(null, [
//                                                         {
//                                                             email:
//                                                                 result.rows[0]
//                                                                     .email,
//                                                             name:
//                                                                 result.rows[0]
//                                                                     .name,
//                                                             id:
//                                                                 result.rows[0]
//                                                                     .id,
//                                                         },
//                                                     ]);
//                                                 } else {
//                                                     console.log('no match');
//                                                     return done(null, false);
//                                                 }
//                                             }
//                                             // else if (check){
//                                             //     console.log("password match")
//                                             //     return done(null, [{email: result.rows[0].email, name: result.rows[0].name}]);
//                                             // }
//                                             // else{
//                                             //     console.log(check)
//                                             //     console.log(password)
//                                             //     console.log(result.rows[0].password)
//                                             //     console.log("password not match")
//                                             //     req.flash("danger", "Oops. Incorrect login details.");
//                                             //     return done(null, false);
//                                             // }
//                                         }
//                                     );
//                                 }
//                             }
//                         )
//                     );
//                 } catch (e) {
//                     throw e;
//                 }
//             }
//         }
//     )
// );

// passport.serializeUser(function (user, done) {
//     done(null, user);
// });
// passport.deserializeUser(function (user, done) {
//     done(null, user);
// });

//*****************admin routes************** */
app.get('/adminLogin', (req, res) => {
    res.render('adminLogin');
});

app.post('/adminLogin', db.getAdmin);
app.get('/statistics', (req, res) => {
    pool.query('SELECT * FROM rescued_child', (error, result) => {
        if (error) throw error;
        //res.render("adminPage")
        console.log(result.rows);
        res.render('mainAdmin', { victims: result.rows });
    });
});

app.get('/loginCrimeCell', (req, res) => {
    res.render('crimeCellLogin');
});

app.get('/loginOrphanage', (req, res) => {
    res.render('orphanageLogin');
});

app.post('/loginCrimeCell', db.getCrimeCell);
app.post('/loginOrphanage', db.getOrphanage);

app.get('/crimeCellPage/:crimeCellId', (req, res) => {
    let crimeCellId = req.params.crimeCellId;
    var total_victims;
    var females;
    var males;
    var sex;
    var disabled;
    console.log(crimeCellId);
    pool.query(
        'SELECT * FROM victim WHERE ccid= $1',
        [crimeCellId],
        async (error, res1) => {
            if (error) throw error;
            else {
                let result = await pool.query(
                    'SELECT count(*) FROM victim AS cnt WHERE ccid=$1',
                    [crimeCellId]
                );
                total_victims = result.rows[0].count;
                sex = 'Female';
                result = await pool.query(
                    'SELECT count(*) FROM victim AS cnt WHERE "sex"=$1 and ccid=$2',
                    [sex, crimeCellId]
                );
                females = result.rows[0].count;
                sex = 'Male';
                result = await pool.query(
                    'SELECT count(*) FROM victim AS cnt WHERE"sex"=$1 and ccid=$2',
                    [sex, crimeCellId]
                );
                males = result.rows[0].count;
                var pwd = 'yes';
                result = await pool.query(
                    'SELECT count(*) FROM victim AS cnt WHERE pwdstat=$1 and ccid=$2',
                    [pwd, crimeCellId]
                );
                disabled = result.rows[0].count;
                //res.render("adminPage")
                console.log(res1.rows);
                res.render('adminPage', {
                    victims: res1.rows,
                    address: address,
                    ccid: crimeCellId,
                    viccount: total_victims,
                    male: males,
                    female: females,
                    disabled: disabled,
                });
            }
        }
    );
});
app.get('/orphanagePage/:orphanageID', async (req, res) => {
    let orphanageID = req.params.orphanageID;
    var total_victims;
    var females;
    var males;
    var sex;
    var disabled;
    console.log(orphanageID);
    pool.query(
        'SELECT * FROM victim WHERE oid= $1',
        [orphanageID],
        async (error, res1) => {
            if (error) throw error;
            else {
                let result = await pool.query(
                    'SELECT count(*) FROM victim AS cnt and oid=$1',
                    [orphanageID]
                );
                total_victims = result.rows[0].count;
                sex = 'Female';
                result = await pool.query(
                    'SELECT count(*) FROM victim AS cnt WHERE "sex"=$1 and oid=$2',
                    [sex, orphanageID]
                );
                females = result.rows[0].count;
                sex = 'Male';
                result = await pool.query(
                    'SELECT count(*) FROM victim AS cnt WHERE"sex"=$1 and oid=$2',
                    [sex, orphanageID]
                );
                males = result.rows[0].count;
                var pwd = 'yes';
                result = await pool.query(
                    'SELECT count(*) FROM victim AS cnt WHERE pwdstat=$1 and oid=$2',
                    [pwd, orphanageID]
                );
                disabled = result.rows[0].count;
                //res.render("adminPage")
                console.log(res1.rows);
                res.render('adminPageorphan', {
                    victims: res1.rows,
                    address: address,
                    oid: orphanageID,
                    viccount: total_victims,
                    male: males,
                    female: females,
                    disabled: disabled,
                });
            }
        }
    );
});

app.get('/displaymap/:victimLat/:victimLng/:orphanageID', db.displayMap);

app.get('/displaycrimemap/:victimLat/:victimLng/:crimecellID', db.displayCrime);

app.get('/displayrescued', db.displayRescued);

app.get('/rescuedbymecc/:crimecellId', db.rescuedbyMecc);

app.get('/rescuedbymeccmap/:crimeCellId', db.rescuedbyMeccMap);

app.get('/rescuedmalecc/:crimecellId', db.rescuedMalecc);

app.get('/rescuedmaleccmap/:crimeCellId', db.rescuedMaleccMap);

app.get('/rescuedfemalecc/:crimecellId', db.rescuedFemalecc);

app.get('/rescuedfemaleccmap/:crimeCellId', db.rescuedFemaleccMap);

app.get('/rescuedpwdcc/:crimecellId', db.rescuedPwdcc);

app.get('/rescuedpwdccmap/:crimeCellId', db.rescuedPwdccMap);

app.get('/rescuedlt5cc/:crimecellId', db.rescuedlt5cc);

app.get('/rescuedlt10cc/:crimecellId', db.rescuedlt10cc);

app.get('/rescuedlt15cc/:crimecellId', db.rescuedlt15cc);

app.get('/rescuedbymeo/:orphanageID', db.rescuedbyMeo);

app.get('/rescuedbymeomap/:orphanageID', db.rescuedbyMeoMap);

app.get('/rescuedmaleo/:orphanageID', db.rescuedMaleo);

app.get('/rescuedmaleomap/:orphanageID', db.rescuedMaleoMap);

app.get('/rescuedfemaleo/:orphanageID', db.rescuedFemaleo);

app.get('/rescuedfemaleomap/:orphanageID', db.rescuedFemaleoMap);

app.get('/rescuedpwdo/:orphanageID', db.rescuedPwdo);

app.get('/rescuedpwdoMap/:orphanageID', db.rescuedPwdoMap);

app.get('/rescuedlt5o/:orphanageID', db.rescuedlt5o);

app.get('/rescuedlt10o/:orphanageID', db.rescuedlt10o);

app.get('/rescuedlt15o/:orphanageID', db.rescuedlt15o);

app.post('/rescuedChildcc/:crimeCellId/:vid', (req, res) => {
    console.log(req.params.vid);
    let vid = req.params.vid;
    let ccid = req.params.crimeCellId;
    pool.query('SELECT * FROM victim WHERE id=$1', [vid], (err, results) => {
        if (err) {
            throw err;
        } else {
            console.log(results);
            let row = results.rows[0];
            console.log(row);
            pool.query(
                'INSERT INTO rescued_child (sex, age, vid,lat,lng,ccid,pwdstat) VALUES($1, $2, $3,$4,$5,$6,$7)',
                [
                    row.sex,
                    row.age,
                    row.id,
                    row.lat,
                    row.lng,
                    row.ccid,
                    row.pwdstat,
                ],
                (err, resulting) => {
                    if (err) {
                        throw err;
                    }
                }
            );
        }
    });
    // res.redirect("/crimeCellPage/"+req.params.crimeCellId);
    pool.query(
        'DELETE FROM victim WHERE id=$1',
        [req.params.vid],
        (err, result) => {
            if (err) {
                throw err;
            } else {
                console.log(result);
                res.redirect('/crimeCellPage/' + req.params.crimeCellId);
            }
        }
    );
});

app.post('/rescuedChildo/:orphanageID/:vid', (req, res) => {
    console.log(req.params.vid);
    let vid = req.params.vid;
    let oid = req.params.orphanageID;
    pool.query('SELECT * FROM victim WHERE id=$1', [vid], (err, results) => {
        if (err) {
            throw err;
        } else {
            console.log(results);
            let row = results.rows[0];
            console.log(row);
            pool.query(
                'INSERT INTO rescued_child (sex, age, vid,lat,lng,oid,pwdstat) VALUES($1, $2, $3,$4,$5,$6,$7)',
                [
                    row.sex,
                    row.age,
                    row.id,
                    row.lat,
                    row.lng,
                    row.oid,
                    row.pwdstat,
                ],
                (err, resulting) => {
                    if (err) {
                        throw err;
                    }
                }
            );
        }
    });
    // res.redirect("/crimeCellPage/"+req.params.crimeCellId);
    pool.query(
        'DELETE FROM victim WHERE id=$1',
        [req.params.vid],
        (err, result) => {
            if (err) {
                throw err;
            } else {
                console.log(result);
                res.redirect('/orphanagePage/' + req.params.orphanageID);
            }
        }
    );
});

//**************************************************** */

app.get('/directForm', (req, res) => {
    res.render('victimform', { userId: '' });
});

//**************************************end of bs************************ */

app.post('/admin', db.createAdmin);

app.post('/users/:id', multer, db.addVictimData);

app.post('/addorphan', db.createOrphan);
app.post('/addcrime_cell', db.createCrimeCell);

// app.post('/signup', db.createUser);
// app.get('/login', db.getUser);

app.listen(port, address, () => {
    console.log(`Server running on port: ${port} at address ${address}`);
});
