const express = require("express");
const bodyParser = require("body-parser");
const db = require("./queries/combinedQueries");
const multer = require("./multipart");
const app = express();
const port = 3000;
const ejs= require("ejs")

//*******************addition by bs************/
require("dotenv").config();
const PORT = process.env.PORT || 5000
const flash = require("connect-flash");
const passport = require("passport");
const  request = require("request");
const session = require("express-session");
const path = require("path");
const bcrypt = require("bcrypt")
const uuidv4 = require("uuid/v4");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("./pool")
app.use(require("cookie-parser")());

const expressSession = require("express-session");
app.use(expressSession({secret: "mySecretKey"}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(session({secret: "keyboard cat"}))

app.use(express.static("public"))

app.set("view engine", "ejs")

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
    bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 50000,
    })
);

app.get("/", (req, res) => {
    //res.json({ info: "Node.js, Express, and Postgres API" });
    res.render("home")
});

app.get("/userLogin", function (req, res, next) {
    if (req.isAuthenticated()) {
        //res.redirect("/users/"+req.user[0].id)
        res.redirect("/victimform")
    }
    else{
    res.render("userLogin");
    }
 });

 app.post("/userLogin", passport.authenticate("local", {
    successRedirect: "/victimform",
    failureRedirect: "/userLogin",
    failureFlash: true
    }), function(req, res) {
        console.log(req.user)
    // if (req.body.remember) {
    // req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
    // } else {
    // req.session.cookie.expires = false; // Cookie expires at end of session
    // }
    res.redirect("/");
    });


//*******************sejal route********************* */

app.get("/victimform",(req, res)=>{
    if (req.isAuthenticated()) {
        //res.redirect("/users/"+req.user[0].id)
        res.render("victimform", {userId: req.user[0].id})
    }
    else{
    res.redirect("/userLogin");
    }
    
    
})

app.post("/users/:id", multer, db.addVictimData);



//******************************************** */

app.get("/userRegister", (req, res)=>{
    res.render("userRegister")
})

app.post("/userRegister", async function (req, res) {
    console.log(req.body.name)
 
    try{
        const client = await pool.connect()
        await client.query("BEGIN")
        var pwd = await bcrypt.hash(req.body.password, 5);
        await JSON.stringify(client.query("SELECT id FROM users WHERE email=$1", [req.body.email], function(err, result) {
            if(result.rows[0]){
                req.flash("warning");
                res.redirect("/userRegister");
            }
            else{
            client.query("INSERT INTO users (id, name, contact, password, email) VALUES ($1, $2, $3, $4, $5)", [uuidv4(), req.body.name, parseInt(req.body.contact), req.body.password, req.body.email], function(err, result) {
                if(err){console.log(err);}
                else {
                
                    client.query("COMMIT") 
                    console.log(result)
                    req.flash("success","User created.")
                    res.redirect("/userLogin");
                    return;
                }
            });
            
            
            }
        
        }));
        client.release();
    } 
    catch(e){throw(e)}
    });

app.get("/logout", function(req, res){
 
    console.log(req.isAuthenticated());
    req.logout();
    console.log(req.isAuthenticated());
    req.flash("success", "Logged out. See you soon!");
    res.redirect("/");
});

passport.use("local", new LocalStrategy({passReqToCallback : true}, (req , username, password, done) => {
 
    loginAttempt();
    async function loginAttempt() {
    
    
        const client = await pool.connect()
        try{
            await client.query("BEGIN")
            var currentAccountsData = await JSON.stringify(client.query("SELECT id, name, email, password FROM users WHERE email=$1", [username], function(err, result) {
    
            if(err) {
                console.log(err)
            return done(err)
            } 
            if(result.rows[0] == null){
                console.log("wrong credentials(no email found)")
                req.flash("danger", "Oops. Incorrect login details.");
                return done(null, false);
            }
            else{
                console.log("email found")
                bcrypt.compare(password, result.rows[0].password, function(err, check) {
                if (err){
                console.log("Error while checking password");
                return done();
                }
                else{
                    if(password===result.rows[0].password){
                        console.log("password match")
                        return done(null, [{email: result.rows[0].email, name: result.rows[0].name, id: result.rows[0].id}]);
                    }
                    else{
                        console.log("no match")
                        return done(null, false);
                    }
                }
                // else if (check){
                //     console.log("password match")
                //     return done(null, [{email: result.rows[0].email, name: result.rows[0].name}]);
                // }
                // else{
                //     console.log(check)
                //     console.log(password)
                //     console.log(result.rows[0].password)
                //     console.log("password not match")
                //     req.flash("danger", "Oops. Incorrect login details.");
                //     return done(null, false);
                // }
                    });
                }
            }))
        }
    
        catch(e){throw (e);}
    };
    
   }
   ))

   passport.serializeUser(function(user, done) {
    done(null, user);
   });
   passport.deserializeUser(function(user, done) {
    done(null, user);
   });

   //*****************admin routes************** */
   app.get("/adminLogin", (req, res)=>{
       res.render("adminLogin")
   })



//**************************************end of bs************************ */


app.post("/admin", db.createAdmin);

app.post("/users/:id", multer, db.addVictimData);

app.post("/addorphan", db.createOrphan);
app.post("/addcrime_cell", db.createCrimeCell);
app.post("/signup", db.createUser);
app.get("/login", db.getUser);

app.listen(port, "192.168.1.16", () => {
    console.log(`Server running on port: ${port}`);
});
