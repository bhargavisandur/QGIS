const pool = require('../pool');
const utility = require('./utility');
const fs = require('fs');
const sendEmail = require('../nodeMailer/sendEmail');

const getOrphanage = (req, res) => {
    const { email, password } = req.body;
    pool.query(
        'SELECT * FROM manager WHERE "password" = $2 and "email" = $1',
        [email, password],
        (error, result) => {
            if (error) throw error;
            else {
                if (result.rows.length == 0) {
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
        'SELECT * FROM orphanage WHERE id=$1', [orphanageID], (error, result) => {
            if (error) throw error;
            let orphanLat = result.rows[0].lat;
            let orphanLng = result.rows[0].lng;
            console.log(orphanLat + " " + orphanLng);
            res.render('map', {
                vlat: victimLat,
                vlng: victimLng,
                olat: orphanLat,
                olng: orphanLng
            });
        }
    )

}

const rescuedbyMe = async (req, res) => {
    var orphanageID = req.params.orphanageID;
    console.log(orphanageID);
    pool.query(
        'SELECT * FROM rescued_child WHERE oid=$1', [orphanageID], async (err, result) => {

            if (err) throw err;
            else {
                let res1 = await pool.query(
                    'SELECT count(*) FROM rescued_child where oid=$1', [orphanageID]
                );
                let cnt = res1.rows[0].count;
                let str = 'The total number of rescued children is: ' + cnt;
                var victims = result.rows;
                console.log(victims)
                res.render('rescuedPage', { victims: victims, str: str });

            }
        }
    )
}

const rescuedMale = async (req, res) => {
    var orphanageID = req.params.orphanageID;

    var sex = 'Male';
    pool.query(
        'SELECT * FROM rescued_child WHERE oid=$1 and "sex"=$2', [orphanageID, sex], async (err, result) => {
            if (err) throw err;
            else {
                let res1 = await pool.query(
                    'SELECT count(*) FROM rescued_child WHERE "sex"=$1 and oid=$2 ', [sex, orphanageID]
                )
                let cnt = res1.rows[0].count;
                let str = 'The total number of rescued males is: ' + cnt;
                var victims = result.rows;
                console.log(victims);
                res.render('rescuedPage', { victims: victims, str: str });
            }
        }
    )
}

const rescuedFemale = async (req, res) => {
    var orphanageID = req.params.orphanageID;
    console.log('oid:' + orphanageID);
    var sex = 'Female';
    pool.query(
        'SELECT * FROM rescued_child WHERE oid=$1 and "sex"=$2', [orphanageID, sex], async (err, result) => {
            if (err) throw err;
            else {
                let res1=await pool.query('SELECT count(*) FROM rescued_child WHERE "sex"=$1 and oid=$2 ', [sex, orphanageID]);
                let cnt=res1.rows[0].count;
                let str = 'The total number of rescued females is: ' + cnt;
                // console.log(result.rows);
                var victims = result.rows;
                console.log("females rescued are:" + victims);
                res.render('rescuedPage', { victims: victims,str:str });
            }
        }
    )
}

const rescuedPwd = async(req, res) => {
    var orphanageID = req.params.orphanageID;
    var pwd = 'yes';
    console.log(orphanageID);
    pool.query(
        'SELECT * FROM rescued_child WHERE oid=$1 and pwdstat=$2', [orphanageID, pwd], async(err, result) => {
            if (err) throw err;
            else{
                let res1=await pool.query('SELECT count(*) FROM rescued_child WHERE "pwdstat"=$1 and oid=$2 ', [pwd, orphanageID]);
                let cnt=res1.rows[0].count;
                let str = 'The total number of PWD rescued is: ' + cnt;   
            var victims = result.rows;
            console.log(victims)
            res.render('rescuedPage', { victims: victims,str:str });

        }
    }
    )
}


const rescuedlt5 = async(req, res) => {
    var orphanageID = req.params.orphanageID;
    var age = 5;
    console.log(orphanageID);
    pool.query(
        'SELECT * FROM rescued_child WHERE oid=$1 and age=$2', [orphanageID, age], async(err, result) => {
            if (err) throw err;
            else{
                let res1=await pool.query('SELECT count(*) FROM rescued_child WHERE age=$1 and oid=$2 ', [age, orphanageID]);
                let cnt=res1.rows[0].count;
                let str = 'The total number of rescued with age less than 5 is: ' + cnt;
            
            var victims = result.rows;
            console.log(`victims:${victims}`)
            res.render('rescuedPage', { victims: victims,str:str });

        }
    }
    )
}

const rescuedlt10 = async(req, res) => {
    var orphanageID = req.params.orphanageID;
    var age = 10;
    console.log(orphanageID);
    pool.query(
        'SELECT * FROM rescued_child WHERE oid=$1 and age=$2', [orphanageID, age], async(err, result) => {
            if (err) throw err;
            else{
                let res1=await pool.query('SELECT count(*) FROM rescued_child WHERE age=$1 and oid=$2 ', [age, orphanageID]);
                let cnt=res1.rows[0].count;
                let str = 'The total number of rescued with age between 10 and 15 is: ' + cnt;
            var victims = result.rows;
            console.log(victims)
            res.render('rescuedPage', { victims: victims,str:str });

        }
    }
    )
}

const rescuedlt15 =async (req, res) => {
    var orphanageID = req.params.orphanageID;
    var age = 15;
    console.log(orphanageID);
    pool.query(
        'SELECT * FROM rescued_child WHERE oid=$1 and age=$2', [orphanageID, age], async(err, result) => {
            if (err) throw err;
            else{
                let res1=await pool.query('SELECT count(*) FROM rescued_child WHERE age=$1 and oid=$2 ', [age, orphanageID]);
                let cnt=res1.rows[0].count;
                let str = 'The total number of rescued with age greater than equal to 15 is: ' + cnt;
            var victims = result.rows;
            console.log(victims)
            res.render('rescuedPage', { victims: victims,str:str });

        }
    }
    )
}

module.exports = { getOrphanage, displayMap, rescuedbyMe, rescuedMale, rescuedFemale, rescuedPwd, rescuedlt5, rescuedlt10, rescuedlt15 };
