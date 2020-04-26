const pool = require('../pool');
const utility = require('./utility');
const fs = require('fs');
const sendEmail = require('../nodeMailer/sendEmail');
const resizeOptimizeImages = require('resize-optimize-images');

const addVictimData = async (req, res) => {
    const { path, filename } = req.file;

    /*******************************
     * Resizing image using sharp
     ********************************/
    (async () => {
        // Set the options.
        const options = {
            images: [path],
            width: 300,
            height: 300,
            quality: 30,
        };

        // Run the module.
        await resizeOptimizeImages(options);
    })();

    let output = await utility.matchImage(filename);
    // console.log(output);
    let ccid = null;
    let oid = null;
    const { lat, lng } = await utility.getLocation(filename); // This is correct
    // console.log('Latitude longitude of the image', lat, lng);
    if (!output[2].includes('Unknown')) {
        ccid = output[2].split('_');
        ccid = ccid[0].slice(2, ccid[0].length);
        console.log(`ccid: ${ccid}`);
    } else {
        const orphanage = await utility.getClosestOrphangeID(lat, lng, pool);
        oid = orphanage.id;
    }

    if(oid!=null){
        pool.query('SELECT email FROM orphanage where oid=$1 ', [oid], (err , result)=>{
            let email= result.rows[0].email;
            sendEmail(email, "Child Found", "<h1> A child has been reported <h1>");
        })
    }
    else{
        pool.query('SELECT email FROM crime_cell where cid=$1 ', [cid], (err , result)=>{
            let email= result.rows[0].email;
            sendEmail(email, "Missing Child Found", "<h1> A child that had been reported missing has been found <h1>");
        })

    }
    const { age, pwdstat, activity, description, uid } = req.body;
    let sex = await utility.findGender(filename);
    console.log(`Sex of the person in the image:${sex}`);
    // console.log(path);
    const { date, time } = utility.getDateTime();
    pool.query(
        'INSERT INTO victim (sex, age, pwdstat, activity, description, date, time, lat,lng, image, uid, ccid, oid) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
        [
            sex,
            age,
            pwdstat,
            activity,
            description,
            date,
            time,
            lat,
            lng,
            path,
            uid,
            ccid,
            oid,
        ],
        (error, result) => {
            if (error) {
                console.log(`error occured ${error}`);
                res.redirect('/victimform');
            } else {
                res.redirect('/');
                sendEmail(req.body.uid, 'Thank you for using the NoAbuse app!', "<h1>Thank you for using noAbuse app<h1>");
            }
            // res.writeContinue(200, { success: true });
        }
    );

    // let imageMatched = await utility.matchImage(filename);
    // console.log(imageMatched);

    // if(!imageMatched[2].includes('Unknown')){
    //     let ccid= imageMatched[2][0];
    //     pool.query('UPDATE victim SET ccid= $1 where victm')
    // }

    // res.redirect('/');

    // pool.query("SELECT * FROM victim", (error, result) => {
    //     res.status(200).json(result.rows);
    // });
};

const createUser = (req, res) => {
    const { name, email, password, contact } = req.body;
    pool.query(
        'INSERT INTO users (name,email,password,contact) VALUES($1,$2,$3,$4)',
        [name, email, password, contact],
        (error, result) => {
            if (error) {
                throw error;
            }

            res.writeContinue(200, { success: true });
        }
    );
    pool.query('SELECT * FROM users', (error, result) => {
        if (error) throw error;
        res.status(200).send(result.rows);
    });
};

const getUser = (req, res) => {
    const { email, password } = req.body;
    pool.query(
        'SELECT * FROM users WHERE "password" = $2 and "email" = $1',
        [email, password],
        (error, result) => {
            if (error) throw error;
            res.writeContinue(200, { success: true });
        }
    );
};

module.exports = { addVictimData, getUser, createUser };
