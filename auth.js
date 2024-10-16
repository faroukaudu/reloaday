const myModule = require('./index.js');
const app = myModule.main;
const passport = require("passport");
const session = require("express-session");
const _ = require('lodash');
const User = myModule.userDB;
const https = require('https');


app.get("/sign-in", (req,res)=>{
    res.render("backend/auth/sign-in");
})

app.get("/sign-up", (req,res)=>{
    res.render("backend/auth/sign-up");
})

// uSER sIGN in ///////////////>>
app.post("/login", (req,res)=>{
    // console.log("loginningn");
    req.body.username = _.capitalize(req.body.username);
    //   console.log(req.body.username +" is the mail");
    //   console.log(_.capitalize(req.body.username));
      var userLogin = new User({username:req.body.username, password:req.body.password});
      req.login(userLogin, function(err){
        if(!err){
          passport.authenticate("local", {
            
            // successRedirect: "/dashboard",
            failureRedirect:"/error911",
            failureMessage: true
          })(req,res, function(){

            res.redirect("/dashboard");
            })
        }else{
            res.send(err);
        //   res.render("userdash/animations/usererr", {errorMsg:"Invalid Login Details !!!"});
          // res.send("error login")
        }
    })
});
// uSER sIGN in EnD//////////////////>


// User Registration //////////////>>>>>>>>>>>>>>>>>>>>

app.post("/register", function(req, res){
    // console.log("Registering");
    req.body.username = _.capitalize(req.body.username);

  
      User.register(new User({
        username:req.body.username,
        firstname: _.capitalize(req.body.fname),
        lastname:_.capitalize(req.body.lname),
        email:req.body.username,
        country:req.body.address,
        regDate:"today",
        phone:req.body.phone,
        wallet_balace:0,
      }), req.body.password, 
      function(err, user){
        if(!err){
          passport.authenticate("local", {
            failureRedirect: '/error991',
            failureMessage: true
          })(req, res, function () {
           
            // setTimeout(function() {
              // res.redirect("/sign-in");
              res.send("User Registered");
            //   res.render("my-account",{cookies:req.session});
            //   welcomeEmail({username:req.body.firstname, email:req.body.username});
            // }, 2000);
          });
        }else{
            res.send(err);
            console.log("Error!");
        //   res.render("userdash/animations/usererr", {errorMsg:"Registration Error!!!"});
        }
      
      })
      
});

app.get("/dashboard",(req,res)=>{
  if(req.isAuthenticated()){
    res.render("backend/dashboard/userdash",{userInfo:req.user});
  }else{
    res.redirect("/sign-in");
  }
})
// User Registration ENd /////////////////////////>>
