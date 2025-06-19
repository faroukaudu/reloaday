const myModule = require('./index.js');
const app = myModule.main;
// const topUp = require("./apis/mobileRecharge.js");
var mobileNetworkSchema = require(__dirname + "/db/dataplans.js");
const Payment = require('./middleware/payment.js');
var randomize = require('randomatic');
const passport = require("passport");
const session = require("express-session");
const _ = require('lodash');
const mongoose = require("mongoose");
const anonymousInfoSchema = require(__dirname + "/db/anony.js");



// const Dataplan = mongoose.model("DataPlan",mobileNetworkSchema)


const Anonymous = mongoose.model("Anony",anonymousInfoSchema);

app.post("/quickairtime", async (req,res)=>{
    
      var amount = (req.body.amount) 
      // Total Amount
      var tAmount = Number(req.body.amount);
      // Round to 2 decimal point
      let roundedAmt = parseFloat(tAmount).toFixed(2);
      console.log("Amount to Pay "+roundedAmt );
      var fullname = "Anonymous"; 
      var email = "anonymous@reloaday.com";
      var paymentInfo = "Anonymous Airtime Topup";
      var newtriggerRef = randomize('aA0', 19);
   
     Payment.monnify(fullname,
           email,roundedAmt, 
           newtriggerRef,
           paymentInfo).then(data =>{
            Anonymous.create({
              triggerRef:newtriggerRef,
              triggerType:req.body.type,
              amount:req.body.amount,
              userDelivery:false,
              phone:req.body.phone,
              network:req.body.network,
              plan:null,
              // email:req.body.email
    
            });
            res.redirect(data.responseBody.checkoutUrl);
           }).catch(err=>{
            console.log(err);
            
           })


     
  });

  app.post("/quickdatatop", async (req,res)=>{
    
    var amount = (Number(req.body.amount) / 100) * 1.65;
      // Total Amount
      var tAmount = Number(req.body.amount) + amount;
      // Round to 2 decimal point
      let roundedAmt = parseFloat(tAmount).toFixed(2);
      console.log("Amount to Pay "+roundedAmt );
      var fullname = "Anonymous"; 
      var email = "anonymous@reloaday.com";
      var paymentInfo = "Anonymous Data Topup";
      var newtriggerRef = randomize('aA0', 19);
   
     Payment.monnify(fullname,
           email,roundedAmt, 
           newtriggerRef,
           paymentInfo).then(data =>{
            Anonymous.create({
              triggerRef:newtriggerRef,
              triggerType:req.body.type,
              amount:req.body.amount,
              userDelivery:false,
              phone:req.body.phone,
              network:req.body.network,
              plan:null,
              // email:req.body.email
    
            });
            res.redirect(data.responseBody.checkoutUrl);
           }).catch(err=>{
            console.log(err);
            
           })

   
});