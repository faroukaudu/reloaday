// Hello Farouk,

// To disable slow scrolling, navigate to the main.js file and remove the code between lines 1039 and 1048.

// https://prnt.sc/YerAAovzPjQb

// Thanks.
// const Monnify = require('monnify-nodejs')
// import {Monnify} from "./apis/moni.js";
const Monnify = require("./apis/moni.js");
const express = require("express");
const bodyParser = require("body-parser");
const topUp = require("./apis/mobileRecharge.js");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
var db = require(__dirname + "/db/connection.js");
var userschema = require(__dirname + "/db/userdb.js");
const _ = require('lodash');
const MongoStore = require("connect-mongo");
var randomize = require('randomatic');
const Payment = require('./middleware/payment.js');
const nombapay = require("./middleware/nomba_pay.js");
const { log } = require("handlebars");
var mobileNetworkSchema = require(__dirname + "/db/dataplans.js");
// const topUp = require("./apis/mobileRecharge.js")
// const Payment = require('./middleware/payment.js');

// const monnifyPay = require("./apis/monnify.js");
// const mon = require("./apis/moni.js");
// const { log } = require("handlebars/runtime");
require('dotenv').config();
// Initializing app object
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//setting Plugins for app 
app.set('view engine', 'ejs');
app.use(express.static("public"));
//setting Plugins for app

// Cookies Management
app.use(session({
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: false,
    // store: new MongoStore({mongoUrl: 'mongodb://127.0.0.1:27017/lawDB',
    //                         ttl:14*60*1000}),
    // store: new MongoStore({mongoUrl: "mongodb+srv://consumerlaw:"+process.env.PASSWORDDB+"@consumerlaw.vfwut3x.mongodb.net/lawDB",
    //                         ttl:14*60*1000}),
    cookie: { 
        //Expire Session after 1min.
        maxAge: 1200000,
     }
  }));


  
  // Initialize Seesion start////////////
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Initialize Seesion end///////////>>>>>


//   DB connection link
  // const uri = "mongodb://127.0.0.1:27017/topit";
const uri = "mongodb+srv://Topit:"+process.env.MYMAINDBPASS+"@topit.qa7wgxv.mongodb.net/?retryWrites=true&w=majority&appName=topit";
database().catch(err => console.log(err));


// Async for DB connections ///////////////////////////////
async function database() {
    await mongoose.connect(uri);
    // await mongoose.connect('mongodb://127.0.0.1:27017/emcDB');
  }
//   Async DB connections Ends ////////////////////////////

// User Data Passport>>>>>>>>>>>>>>>>>>>>>>>ddd
function appDb(){
    // userschema.plugin(uniqueValidator);
    const Admindb = mongoose.model("User",userschema);
    passport.use(Admindb.createStrategy());
  
    passport.serializeUser(function(user, cb) {
      console.log("serializing user uwuss:" + JSON.stringify(user))
      process.nextTick(function() {
        console.log(user.id);
          return cb(null, user.id)
      })
  });
  
  passport.deserializeUser(function (id, cb) {
    console.log("trying to GET" + id);
      console.log("deserializing user owo:" + JSON.stringify(id))
      Admindb.findById({_id:id}).then((user)=>{
        console.log("GETTING");
        return cb(null, user);
      }).catch((err)=>{
        return cb(err);
      });   
  });
  
     return Admindb;
  }

  const User = appDb();
// User Data Passport Ends   >>>>>>>>>>>>>>>>>>>>>>>

// ////////////////////////////FUNCTIONS
function getRandomCharacter() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters.charAt(randomIndex);
}
//////////////////////////////FUNCTIONS END
//////////////////////// ROutes ////////////////////////////////////////




// uSER sIGN in ///////////////>>

// DashBoard
app.get("/dash",(req,res)=>{
    if(req.isAuthenticated()){
      console.log(req.user);
      res.render("backend/dashboard/userdash");
    }else{
      res.redirect("/sign-in")
    }
})
app.get("/not",(req,res)=>{
  res.render("backend/dashboard/notificationss");
  // console.log(getRandomCharacter(10));
  // console.log();
})
app.get("/data",(req,res)=>{
  if(req.isAuthenticated()){
    res.render("backend/dashboard/buydata", {userInfo:req.user});
  }else{
    res.redirect("/sign-in")
  }
})

app.get("/fundWD",(req,res)=>{
  res.render("backend/dashboard/fundwalletD");
})
app.get("/fund-wallet",(req,res)=>{
  if(req.isAuthenticated()){
    res.render("backend/dashboard/monnify", {userInfo:req.user});
  }else{
    res.redirect("/sign-in");
  }
})
app.get("/trans",(req,res)=>{
  res.render("backend/dashboard/transactions");
})

// app.use((req,res,next)=>{
//   console.log("I am in first middle ware");
//   // const errr = "Somthing wen wrong";
//   next();
// })

// app.use((req,res,next)=>{
//   console.log("I am in second middle ware");
//   // const errr = "Somthing wen wrong";
//   // next();
//   res.send("Second Middle Ware");
// })


































const Dataplan = mongoose.model("DataPlan", mobileNetworkSchema);

// Landing Page
app.get("/", (req,res)=>{
  console.log("GLADTIDE_AUTH:", process.env.GLADTIDE_AUTH);
// console.log("NOMBA_SECRET:", process.env.NOMBA_SECRET);
console.log("BASE_URL:", process.env.BASE_URL);
console.log("LIve client ID", process.env.NOMBA_CLIENT_ID_LIVE);
console.log("Private Key", process.env.NOMBA_PRIVATE_KEY_LIVE);


    // console.log("Hello world");
    Dataplan.find({}).then((data)=>{
      res.render("frontend/landing", {dataplans:data});
    }).catch((err)=>{
      console.log(err);
    })
    

})
app.get("/contact", async (req,res)=>{
  let data = await topUp.gladUser();

  // console.log("TYPE:", typeof data);
  // console.log("TOP KEYS:", Object.keys(data))
  // console.log("HAS user?:", "user" in data, "VALUE:", data.user);
  const accountBalance = data.user.Account_Balance;
console.log(accountBalance); // 3
  
    // console.log("Hello world");
    // res.render("frontend/contact")
})



app.post("/monnify-pay", async (req,res)=>{
  if(req.isAuthenticated()){
    // var amount = req.body.amount;
    // Total Amount
    var tAmount = Number(req.body.amount);
    // Round to 2 decimal point
    let roundedAmt = parseFloat(tAmount).toFixed(2);
    console.log("Amount to Pay "+roundedAmt );
    var fullname = req.user.firstname + " " + req.user.lastname; 
    var email = req.user.username;
    var paymentInfo = req.body.paymentDesc;
      // topUp.airtime();
      // res.send("done");
      // await res.send(monnifyPay.monnify());
      // var secretKey = process.env.MONNIFY_SECRET_KEY;
      // var apiKey = process.env.MONNIFY_API_KEY;
      // var baseUrl = "sandbox.monnify.com";
      
      // async function testMonnify() {
      //     const m = new Monnify(secretKey, apiKey, baseUrl);
      //     const genT = await m.genToken();
      //     // console.log("TOKEN"+genT.responseBody.accessToken);
      //     console.log();
          
      
      //     let requestBody = {
      //         "amount": roundedAmt,  //Round up to 2 Decimal point
      //         "customerName": req.user.firstname +" "+ req.user.lastname,
      //         "customerEmail": req.user.username,
      //         "paymentReference": randomize('aA0', 19),
      //         "paymentDescription": "Funding Wallet",
      //         "currencyCode": "NGN",
      //         "contractCode":process.env.CONTRACT_CODE.toString(),
      //         "redirectUrl": "http://localhost:3000",
      //         "paymentMethods":["CARD", "ACCOUNT_TRANSFER", "USSD", "PHONE_NUMBER", "BANK", "QR"]
      //     };
      //     const data = await m.initiatePayment(requestBody, genT.responseBody.accessToken);
  
      //     console.log(data);
      //     res.redirect(data.responseBody.checkoutUrl);
          
      // }
      // testMonnify();
      Payment.monnify(fullname,
         email,roundedAmt, 
         randomize('aA0', 19),
         paymentInfo).then(data =>{
          res.redirect(data.responseBody.checkoutUrl);
         }).catch(err=>{
          console.log(err);
          
         })
      // res.redirect(payData.responseBody.checkoutUrl);
      
      // testMonnify().then(reseult =>{
      //     console.log(reseult);
      // }).catch(error =>{
      //     console.log(error);
      // })
  }else{
    res.redirect("/sign-in");
  }
    
   
})
// MONNIFY VAT & CHARGES=== 1.61% Fee
//MONIFY SETTLING AMOUNT = 98.39% been Paid
// NEXT ON WORKING ON ADDING BALANCE


// NOMBA PAYMENT
app.post("/nomba-pay", async (req,res)=>{
  if(req.isAuthenticated()){

    var tAmount = Number(req.body.amount);
    // Round to 2 decimal point
    let roundedAmt = parseFloat(tAmount).toFixed(2);
    console.log("Amount to Pay "+roundedAmt );
    var fullname = req.user.firstname + " " + req.user.lastname; 
    var email = req.user.username;
    var paymentInfo = req.body.paymentDesc;
    var cutId = req.user.id.slice(0,8);
    console.log(cutId);
    


     const data =await nombapay(fullname,email,roundedAmt,cutId);
  // console.log();
  res.redirect(data.data.checkoutLink);
      

      
  }else{
    res.redirect("/sign-in");
  }
    
   
})


app.get("/base", (req,res)=>{
    console.log(Buffer.from("MK_TEST_EFWUF8HXVY:SWN9RJQ6MYS3YCM5BQTFH6J4VH3RXW3W").toString('base64'));
})

app.post("/gladwebhook", async (req,res)=>{
  const webhookData = await req.body;
  console.log('Received webhook data:', JSON.stringify(webhookData, null, 2));
    res.status(200).send('Webhook received successfully');
})


app.get("/logout", (req,res)=>{
  req.logOut((err)=>{
    if(err){
      console.log(err);
      
    }else{
      res.redirect("/");
    }
  })
})


app.get("/super-Admin", async (req,res)=>{
    // console.log("Hello world");
    if(!req.isAuthenticated()){
      res.redirect("/sign-in");
    }
   

    try {
       let data = await topUp.gladUser();
    const accountBalance = data.user.Account_Balance;
      const totalUsers = await User.countDocuments({});
    const txFeed = await User.aggregate([
      // explode transactions[] into separate docs
      { $unwind: "$transactions" },

      // shape output (include user identity + tx fields)
      {
        $project: {
          _id: 0,

          firstname: "$firstname",
          lastname: "$lastname",
          email: "$email",

          paymentStatus: "$transactions.paymentStatus",
          transactionRef: "$transactions.transactionRef",
          paymentRef: "$transactions.paymentRef",
          paymentDesc: "$transactions.paymentDesc",
          paymentMeth: "$transactions.paymentMeth",
          amountPaid: "$transactions.amountPaid",
          date: "$transactions.date",
          checkoutMode: "$transactions.checkoutMode",
          txId: "$transactions._id",

          // used only for sorting
          txDate: { $toDate: "$transactions.date" },
        },
      },

      // newest first
      { $sort: { txDate: -1 } },
    ]);

    // res.render("backend/dashboard/super-admin",{userInfo:req.user})

    return res.render("backend/dashboard/super-admin", {
      userInfo: req.user,
      title: "All Transactions",
      txFeed,
      apiBalance:accountBalance,
      totalUserCount:totalUsers
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
})

















module.exports = {
    main:app,
    userDB:User,

  }