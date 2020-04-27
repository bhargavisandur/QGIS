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

const rescuedbyMe=(req,res)=>{
    var orphanageID=req.params.orphanageID;
    console.log(orphanageID);
    pool.query(
        'SELECT * FROM rescued_child WHERE oid=$1',[orphanageID],(err,result)=>{
            if(err) throw err;
             var victims=result.rows;
             console.log(victims)
            res.render('rescuedPage',{victims:victims});

        }
    )
}

const rescuedMale=(req,res)=>{
    var orphanageID=req.params.orphanageID;
   
    var sex='Male';
    pool.query(
        'SELECT * FROM rescued_child WHERE oid=$1 and "sex"=$2' ,[orphanageID,sex],(err,result)=>{
            if(err) throw err;
            var victims=result.rows;
            res.render('rescuedPage',{victims:victims});
        }
    )
}

const rescuedFemale=(req,res)=>{
    var orphanageID=req.params.orphanageID;
    console.log('ccid:'+orphanageID);
    var sex='Female';
    pool.query(
        'SELECT * FROM rescued_child WHERE oid=$1 and "sex"=$2' ,[orphanageID,'Female'],(err,result)=>{
            if(err) throw err;
           // console.log(result.rows);
            var victims=result.rows;
            console.log("females rescued are:"+victims);
            res.render('rescuedPage',{victims:victims});
        }
    )
}

const rescuedPwd=(req,res)=>{
    var orphanageID=req.params.orphanageID;
    var pwd='yes';
    console.log(orphanageID);
    pool.query(
        'SELECT * FROM rescued_child WHERE oid=$1 and pwdstat=$2',[orphanageID,pwd],(err,result)=>{
            if(err) throw err;
             var victims=result.rows;
             console.log(victims)
            res.render('rescuedPage',{victims:victims});

        }
    )
}


const rescuedlt5=(req,res)=>{
    var orphanageID=req.params.orphanageID;
    var age=5;
    console.log(orphanageID);
    pool.query(
        'SELECT * FROM rescued_child WHERE oid=$1 and age=$2',[orphanageID,age],(err,result)=>{
            if(err) throw err;
             var victims=result.rows;
             console.log(`victims:${victims}`)
            res.render('rescuedPage',{victims:victims});

        }
    )
}

const rescuedlt10=(req,res)=>{
    var orphanageID=req.params.orphanageID;
    var age=10;
    console.log(orphanageID);
    pool.query(
        'SELECT * FROM rescued_child WHERE oid=$1 and age=$2',[orphanageID,age],(err,result)=>{
            if(err) throw err;
             var victims=result.rows;
             console.log(victims)
            res.render('rescuedPage',{victims:victims});

        }
    )
}

const rescuedlt15=(req,res)=>{
    var orphanageID=req.params.orphanageID;
    var age=15;
    console.log(orphanageID);
    pool.query(
        'SELECT * FROM rescued_child WHERE oid=$1 and age=$2',[orphanageID,age],(err,result)=>{
            if(err) throw err;
             var victims=result.rows;
             console.log(victims)
            res.render('rescuedPage',{victims:victims});

        }
    )
}

module.exports = { getOrphanage,displayMap ,rescuedbyMe,rescuedMale,rescuedFemale,rescuedPwd,rescuedlt5,rescuedlt10,rescuedlt15};
