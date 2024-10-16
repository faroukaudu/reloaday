const myModule = require('./index.js');
const app = myModule.main;
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");
const _ = require('lodash');
const User = myModule.userDB;
const https = require('https');
const topUp = require("./apis/mobileRecharge.js");
const { stringify } = require('querystring');
const { userInfo } = require('os');
var mobileNetworkSchema = require(__dirname + "/db/dataplans.js");


const Dataplan = mongoose.model("DataPlan",mobileNetworkSchema)



app.get("/form/:network",(req,res)=>{
  if(req.isAuthenticated()){
    Dataplan.find({networkName:req.params.network}).then((result)=>{
      res.render("backend/dashboard/form", {network:req.params.network, userInfo:req.user, dataPlans:result});
    })
  }else{
    res.redirect("/sign-in");
  }
})
// Network Selections
    function networkID (network){
    var networkID;
    if(network === "MTN"){
      networkID = 1;
    }else if(network === "GLO"){
      networkID = 2;
    }else if(network === "AIRTEL"){
      networkID = 3;
    }else if (network === "9Mobile"){
      networkID = 6;
    }else {
      console.log("Not a network");
      
    }
    return networkID;
    }
  
  app.post("/topit", (req,res)=>{
    console.log(req.body.dataplan);
    console.log(req.body.select);
    
    switch (req.body.select){
        case 'wallet':
            if(req.isAuthenticated()){
              const planID = Number(req.body.dataplan);
              console.log("network is "+ req.body.network);
              const topPhone = req.body.phoneNum;
              const networkId = networkID(req.body.network);
              console.log(req.user.id);
              
                // console.log(planID);
      
      
          
          
          
              // console.log("Getting All my Data "+ result);
              
              Dataplan.findOne({bundleCode:req.body.dataplan}).then((plan)=>{
                User.findById(req.user.id).then((userFound)=> {
                  topUp.mobileData(networkId,planID,topPhone).then((result)=>{
      
                  userFound.wallet_balace = userFound.wallet_balace - plan.amount;
                  userFound.save();
                  // res.send(result);
                  console.log(result);
                  
                  //  res.send(JSON.parse(result));
                  //  const jResult = JSON.parse(result);
                  //  res.send(jResult);
                  //  console.log("results are "+ jResult);
                  
              // res.render("backend/dashboard/payment-invoice",{userInfo:req.user, planInfo:jResult});
              // res.redirect(`/`)
              res.redirect(`/invoice?planInfo=${encodeURIComponent(result)}`);
          
                }).catch((e)=>{
                  console.log(e);
                  
                })
                
              }).catch((e)=>{
                console.log(e);
                
              })
      
              // res.send(JSON.parse(result));
              // res.render("backend/dashboard/payment-invoice",{userInfo:req.user, planInfo:jResult});
              
              }).catch((err)=>{
                console.log(err);
                
              })
            }else {
                res.redirect(301, "/sign-in");
            }
          break;
        case 'monnify':
          console.log("Net to set up monnify");
          break;
        case 'transfer':
          console.log("Yet to setup Bank Transfer");
          break;
          
      
    }
    

    
    
  
    
  
    
    
  
  });



  // const myData = {
  //   "id": 99035818,
  //   "ident": "Data5e0957b24-2d6",
  //   "network": 1,
  //   "balance_before": "189.80999999999995",
  //   "payment_medium": "MAIN WALLET",
  //   "balance_after": "176.80999999999995",
  //   "mobile_number": "08160278321",
  //   "plan_type": "SME2",
  //   "duration": "30 days",
  //   "plan": 364,
  //   "client_ip": "197.210.227.33",
  //   "Status": "successful",
  //   "api_response": "Dear Customer, You have successfully shared 25MB Data to 2348160278321. Your new Corporate Gifting data balance is 1192.24GB expires 25/09/2024. Thank you.",
  //   "plan_network": "MTN",
  //   "plan_name": "25.0MB",
  //   "plan_amount": "13.0",
  //   "create_date": "2024-08-20T18:11:22.570912",
  //   "Ported_number": true
  //   }



  app.get("/invoice", (req,res)=>{
    if(req.isAuthenticated()){
      const paymentInfo = JSON.parse(req.query.planInfo);
      console.log(paymentInfo.duration);
      
        Dataplan.findOne({bundleCode:paymentInfo.plan}).then((planFound)=>{
          console.log(planFound);
          
          res.render("backend/dashboard/payment-invoice", {userInfo:req.user,planInfo:paymentInfo,amount:planFound.amount});
        })
    }else{
        res.redirect("/sign-in");
    }
  })




  app.get("/dbpush",(req,res)=>{
    Dataplan.find({}).then((result)=>{
      res.render("dataplan", {plans:result});
    })
  })

  app.post("/dataplan", async (req,res)=>{

    var amt = Number(req.body.amount);
    const dPlans = {
      networkName:_.upperCase(req.body.nname),
    bundleType:req.body.btype,
    bundleSize:_.upperCase(req.body.bsize),
    bundleDuration:_.capitalize(req.body.dur),
    amount:amt,
    bundleCode:req.body.bcode,
    }
    console.log(dPlans);

    await Dataplan.create(dPlans).then(()=>{
      Dataplan.find({}).then((result)=>{
        res.render("dataplan", {plans:result});
      })
    })
    
  })


  app.get("/t", (req,res)=>{
    // res.redirect("/tt");
    const v2 = {age:"31", sex:"male"};
    vv2 = JSON.stringify(v2);
    
    res.redirect(`/tt?secv=${encodeURIComponent(vv2)}`);
  })

  app.get("/tt", (req,res)=>{
    
    const data = req.query.secv;
    // const data2 
    const data2 = JSON.parse(data);
    console.log(data2.age);
    
    
    // res.send(data.age)
    res.render("backend/dashboard/testi", {myv:"one is Farouk", secv:data2})
  })


  app.post("/submitpin", (req,res)=>{
    if(req.isAuthenticated()){
      const pin = req.body.pin; // Retrieve PIN from request body
      console.log('Received PIN:', pin);
  
    User.findById(req.user.id).then((userPin)=>{
      if (pin.length === 4) { 
        userPin.trans_pin = pin;
        userPin.save();
        res.json({ message: 'PIN accepted!' }); // Send success response
    } else {
        res.status(400).json({ message: 'Invalid PIN' }); // Send error response
    }
    })  

    }else{
      res.redirect("/sign-in");
    }

    
  })

  app.get("/airtime",(req,res)=>{
    if(req.isAuthenticated()){
      res.render("backend/dashboard/buyairtime", 
        {userInfo:req.user});
    }else{
      res.redirect("/sign-in");
    }
  })

  app.post("/airtime",(req,res)=>{
    
    
    const phone = req.body.phone;
    const amount = Number(req.body.amount);
    const network = Number(req.body.network);
    
    if(req.isAuthenticated()){
      console.log("Authenticated");
      User.findById(req.user.id).then((userFound)=>{
        console.log("User FOund");
        topUp.airtime(network,amount,phone).then((done)=>{
          console.log("aitime");
          userFound.wallet_balace = userFound.wallet_balace - amount;
          userFound.save();
          res.send("Airtime Paid");

        }).catch((e)=>{
          console.log(e);
          
        })




      }).catch((e)=>{
        console.log(e);
        
      })
    }else{
      res.redirect("/sign-in");
    }

  })