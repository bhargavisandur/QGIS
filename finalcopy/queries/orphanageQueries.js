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

const displayMap=(req,res)=>{
    var victimLat=req.params.victimLat;
    var victimLng=req.params.victimLng;
    
    var orphanageID=req.params.orphanageID;
    pool.query(
        'SELECT * FROM orphanage WHERE id=$1',[orphanageID],(error,result)=>{
            if(error) throw error;
            let orphanLat= result.rows[0].lat;
            let orphanLng=result.rows[0].lng;
            console.log(orphanLat+" "+orphanLng);
            res.render('map',{
                vlat:victimLat,
                vlng:victimLng,
                olat:orphanLat,
                olng:orphanLng
            });
        }
    )

}

module.exports = { getOrphanage,displayMap };
