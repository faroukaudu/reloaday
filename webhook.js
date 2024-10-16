const myModule = require('./index.js');
const app = myModule.main;
const passport = require("passport");
const session = require("express-session");
const _ = require('lodash');
const User = myModule.userDB;
const https = require('https');

app.post("/webhook", async (req,res)=>{
    const webhookData = await req.body;



    
    console.log(webhookData);
    
    const web2DB = {
      transactionRef:webhookData.eventData.transactionReference,
      paymentRef:webhookData.eventData.paymentReference,
      paymentStatus:webhookData.eventData.paymentStatus,
      paymentMeth:webhookData.eventData.paymentMethod,
      date:webhookData.eventData.paidOn,
      paymentDesc:webhookData.eventData.paymentDescription,
      amountPaid:Number(webhookData.eventData.amountPaid),
      // Not going to Database for User Query
      userEmail:webhookData.eventData.customer.email,

    };
    User.findOne({username:webhookData.eventData.customer.email}).then((userFound)=>{
      console.log("User Found & the name is "+ userFound);
      if(web2DB.paymentStatus === "PAID"){
        userFound.transactions.push(web2DB);
        userFound.wallet_balace = userFound.wallet_balace + webhookData.eventData.amountPaid;
      userFound.save();
      console.log("Saved to DB");
      
      }else{
        console.log("Error grabbing webhook");
        
      }
      
    }).catch((err)=>{
      console.log(err);
      
    })
    // console.log("my grabbed Info =>> "+ JSON.stringify(web2DB));
    // console.log(webhookData);
    
    
    console.log('Received webhook data:', JSON.stringify(webhookData, null, 2));
    res.status(200).send('Webhook received successfully');
})