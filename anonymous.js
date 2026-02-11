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
const nombapay = require("./middleware/nomba_pay.js");



const Dataplan = mongoose.model("DataPlan",mobileNetworkSchema)


const Anonymous = mongoose.model("Anony",anonymousInfoSchema);

function findDataAmount(myBundleCode){
  const bAmount = Dataplan.findOne({bundleCode:myBundleCode}).then((budleAmount)=>{
    return budleAmount.amount
  }).catch((err)=>{
    console.log(err);
    
  })
  return bAmount;
}


    function networkID (network){
    var networkID;
    if(network === "MTN"){
      networkID = 1;
    }else if(network === "GLO"){
      networkID = 2;
    }else if(network === "AIRTEL"){
      networkID = 3;
    }else if (network === "9MOBILE"){
      networkID = 6;
    }else {
      console.log("Not a network");
      
    }
    return networkID;
    }

app.post("/quickairtime", async (req,res)=>{
    
      var amount = (req.body.amount) 
      var phoneNum = (req.body.phone)
      
      // Total Amount
      var tAmount = Number(req.body.amount);
      // Round to 2 decimal point
      let roundedAmt = parseFloat(tAmount).toFixed(2);
      console.log("Amount to Pay "+roundedAmt );
      var fullname = "Anonymous"; 
      // var email = "anonymous@reloaday.com"+phoneNum+"."+networkID(req.body.airtime_network)+"."+randomize('aA0', 6);
      var email =  `anonymous_${phoneNum}_${networkID(req.body.airtime_network)}_${randomize('aA0', 6)}@reloaday.com`;
      var paymentInfo = "Anonymous Airtime Topup";
      var newtriggerRef = randomize('aA0', 19);
      var cutId = "Anynomous"
    
   
    //  Payment.monnify(fullname,
    //        email,roundedAmt, 
    //        newtriggerRef,
    //        paymentInfo).then(data =>{
    //         Anonymous.create({
    //           triggerRef:newtriggerRef,
    //           triggerType:req.body.type,
    //           amount:req.body.amount,
    //           userDelivery:false,
    //           phone:req.body.phone,
    //           network:req.body.network,
    //           type:"Airtime",
    //           successful:false,
    //           plan:null,
    //           // email:req.body.email
    
    //         });
    //         res.redirect(data.responseBody.checkoutUrl);
    //        }).catch(err=>{
    //         console.log(err);
            
    //        })

           const data =await nombapay(fullname,email,roundedAmt,cutId).then(data =>{
            Anonymous.create({
              triggerRef:newtriggerRef,
              triggerType:req.body.type,
              amount:req.body.amount,
              userDelivery:false,
              email:_.capitalize(email),
              phone:req.body.phone,
              network:req.body.airtime_network,
              type:"Airtime",
              successful:false,
              plan:null,
              // email:req.body.email
    
            });
            res.redirect(data.data.checkoutLink);

           }).catch(err=>{
            res.send(err);
            console.log(err);
            
           })





     
  });

  app.post("/quickdatatop", async (req,res)=>{
    const network = req.body.network;
    const phoneNum = req.body.phone;
    const bundleCode = req.body.bundleCode;
    let newAmount = await findDataAmount(req.body.bundleCode);
    
    var amount = (Number(req.body.amount) / 100) * 1.65;
      // Total Amount
      var tAmount = Number(req.body.amount) + amount;
      // Round to 2 decimal point
      let roundedAmt = parseFloat(tAmount).toFixed(2);
      console.log("Amount to Pay "+roundedAmt );
      var fullname = "Anonymous"; 
      // var email = "anonymous@reloaday.com|"+phoneNum+"|"+networkID(req.body.network)+"|"+randomize('aA0', 6);
      var email =  `anonymous_${phoneNum}_${networkID(req.body.network)}_${randomize('aA0', 6)}@reloaday.com`;
      var paymentInfo = "Anonymous Data Topup";
      var newtriggerRef = randomize('aA0', 19);
      var cutId = "Anynomous"
   
    //  Payment.monnify(fullname,
    //        email,roundedAmt, 
    //        newtriggerRef,
    //        paymentInfo).then(data =>{
    //         Anonymous.create({
    //           triggerRef:newtriggerRef,
    //           triggerType:req.body.type,
    //           amount:req.body.amount,
    //           userDelivery:false,
    //           phone:req.body.phone,
    //           network:req.body.network,
    //           plan:null,
    //           // email:req.body.email
    
    //         });
    //         res.redirect(data.responseBody.checkoutUrl);
    //        }).catch(err=>{
    //         console.log(err);
            
    //        })
           const data = await nombapay(fullname,email,newAmount,cutId).then(datas =>{
            Anonymous.create({
              triggerRef:newtriggerRef,
              triggerType:req.body.type,
              amount:newAmount,
              userDelivery:false,
              email:_.capitalize(email),
              phone:req.body.phone,
              network:req.body.network,
              type:"Data",
              successful:false,
              plan:bundleCode,
              // email:req.body.email
    
            });
            console.log(datas);
            
            res.redirect(datas.data.checkoutLink);

           }).catch(err=>{
            res.send(err);
            console.log(err);
            
           })


   
});