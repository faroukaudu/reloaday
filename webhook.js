const myModule = require('./index.js');
const app = myModule.main;
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");
const _ = require('lodash');
const User = myModule.userDB;
const https = require('https');
const express = require("express");
const anonymousInfoSchema = require(__dirname + "/db/anony.js");
const topUp = require("./apis/mobileRecharge.js");


const Anonymous = mongoose.model("Anony", anonymousInfoSchema);


// MONIFY WEBHOOK
app.post("/webhook-monify", async (req, res) => {
  const webhookData = await req.body;




  console.log(webhookData);

  const web2DB = {
    transactionRef: webhookData.eventData.transactionReference,
    paymentRef: webhookData.eventData.paymentReference,
    paymentStatus: webhookData.eventData.paymentStatus,
    paymentMeth: webhookData.eventData.paymentMethod,
    date: webhookData.eventData.paidOn,
    paymentDesc: webhookData.eventData.paymentDescription,
    amountPaid: Number(webhookData.eventData.amountPaid),
    // Not going to Database for User Query
    userEmail: webhookData.eventData.customer.email,

  };
  User.findOne({ username: _.capitalize(webhookData.eventData.customer.email) }).then((userFound) => {
    console.log("User Found & the name is " + userFound);
    if (web2DB.paymentStatus === "PAID") {
      userFound.transactions.push(web2DB);
      const percut = 1.65 / 101.65;
      const cut = webhookData.eventData.amountPaid * percut;

      userFound.wallet_balace = userFound.wallet_balace + (webhookData.eventData.amountPaid - cut);
      userFound.save();
      console.log("Saved to DB");

    } else {
      console.log("Error grabbing webhook");

    }

  }).catch((err) => {
    console.log("NO Userfound " + err);

  })
  // console.log("my grabbed Info =>> "+ JSON.stringify(web2DB));
  // console.log(webhookData);


  console.log('Received webhook data:', JSON.stringify(webhookData, null, 2));
  res.status(200).send('Webhook received successfully');
})


// NOMBA WEBHOOK
app.post("/webhook", express.raw({ type: "*/*" }), async (req, res) => {
  const webhookData = await req.body;
  console.log("✅ WEBHOOK HIT");
  console.log("headers:", req.headers);
    // IMPORTANT: respond immediately
  res.status(200).send("ok");
  // console.log("raw length:", req.body?.length);
  // console.log("webhooks: ", webhookData.data);
  // console.log(webhookData.order);
  console.log(webhookData);


  const web2DB = {
    transactionRef: webhookData.data.transaction.transactionId,
    paymentRef: webhookData.requestId,
    paymentStatus: webhookData.event_type,
    paymentMeth: webhookData.data.order.paymentMethod,
    date: webhookData.data.transaction.time,
    paymentDesc: "Wallet-TopUp",
    amountPaid: Number(webhookData.data.order.amount),
    // Not going to Database for User Query
    userEmail: webhookData.data.order.customerEmail,
    checkoutMode: "Nomba payment"

  };


  // This spilt the Email String to Extract Meta Data
  const parts = web2DB.userEmail.split("_");

  const email = parts[0];
  const phone = parts[1];
  const network = parts[2]

  // anynomouseInfo coding section
  const anyno = web2DB.userEmail;
  if (anyno.includes("anonymous")) {
    console.log("This is an anynomouse user");
    Anonymous.findOne({ email: _.capitalize(web2DB.userEmail) }).then((anyno) => {
      console.log("User Found & the name is " + anyno);
      if (web2DB.paymentStatus === "payment_success") {

        // IF the Request is a Airtime
        if(anyno.triggerType === "airtime"){
          topUp.airtime(network, web2DB.amountPaid, phone).then(airtime => {
          anyno.successful = true;
          anyno.save();
          console.log("AIRTIME PAID!!!");
         
          
        }).catch(err => {
          console.log(err);
          
        })
        // IF the Request is a Data
        }else if(anyno.triggerType === "data"){
          topUp.mobileData(network, anyno.plan, phone).then(data => {
            anyno.successful = true;
            anyno.save();
            console.log("DATA PAID!!!");
          }).catch(err => {
            console.log(err);
            
          })
        }

        
        
        console.log("Saved to DB");

      }else{
        res.send("Error grabbing Funds from clients")
      }
    }).catch((err) => {
      console.log("NO Userfound " + err);

    })


  }else{







    // Registred User
      User.findOne({ username: _.capitalize(web2DB.userEmail) }).then((userFound) => {
    console.log("User Found & the name is " + userFound);
    if (web2DB.paymentStatus === "payment_success") {
      userFound.transactions.push(web2DB);
      // const percut = 1.65/101.65;
      // const cut = webhookData.eventData.amountPaid;

      userFound.wallet_balace = userFound.wallet_balace + (web2DB.amountPaid);
      userFound.save();
      console.log("Saved to DB");

    } else {
      console.log("Error grabbing webhook");

    }

  }).catch((err) => {
    console.log("NO Userfound " + err);

  })

  }



  // console.log(web2DB);




});