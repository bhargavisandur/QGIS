const pool = require('../pool');
const utility = require('./utility');
const fs = require('fs');
const sendEmail = require('../nodeMailer/sendEmail');

const getCrimeCell = (req, res) => {
    const { email, password } = req.body;
    console.log(email,password);
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

const displayCrime=(req,res)=>{
    var victimLat=req.params.victimLat;
    var victimLng=req.params.victimLng;
    var crimecellID=req.params.crimecellID;
    pool.query(
        'SELECT * FROM crime_cell WHERE id=$1 ',[crimecellID],(error,result)=>{
            if(error)throw error;
            cclat=result.rows[0].lat;
            cclng=result.rows[0].lng;
            console.log(cclat,cclng);
            res.render('crime_map',{
                vlat:victimLat,
                vlng:victimLng,
                clat:cclat,
                clng:cclng
            });

        }
    )
}
const rescuedbyMe=(req,res)=>{
    var crimeCellId=req.params.crimeCellId;
    console.log("crimecellid is:"+crimeCellId);
    pool.query(
        'SELECT * FROM rescued_child WHERE ccid=$1',[crimeCellId],(err,result)=>{
            if(err) throw err;
             var victims=result.rows;
             console.log(victims)
            res.render('rescuedPage',{victims:victims});

        }
    )
}

const rescuedMale=(req,res)=>{
    var crimeCellId=req.params.crimeCellId;
   
    var sex='male';
    pool.query(
        'SELECT * FROM rescued_child WHERE ccid=$1 and "sex"=$2' ,[crimeCellId,sex],(err,result)=>{
            if(err) throw err;
            var victims=result.rows;
            res.render('rescuedPage',{victims:victims});
        }
    )
}

const rescuedFemale=(req,res)=>{
    var crimeCellId=req.params.crimeCellId;
    console.log('ccid:'+crimeCellId);
    var sex='Female';
    pool.query(
        'SELECT * FROM rescued_child WHERE ccid=$1 and "sex"=$2' ,[crimeCellId,'Female'],(err,result)=>{
            if(err) throw err;
           // console.log(result.rows);
            var victims=result.rows;
            console.log("females rescued are:"+victims);
            res.render('rescuedPage',{victims:victims});
        }
    )
}

module.exports = { getCrimeCell,displayCrime ,rescuedbyMe,rescuedMale,rescuedFemale};
