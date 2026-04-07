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
var activitySchema = require(__dirname + "/db/activities.js");
const anonymousInfoSchema = require(__dirname + "/db/anony.js");
// const nombaPay = require("./middleware/nomba_pay.js");



// app.get("/nomba-pay", (req,res)=>{
//   nombaPay();
// });

const Dataplan = mongoose.model("DataPlan", mobileNetworkSchema);
const Activity = mongoose.model("Activity", activitySchema);
const Anonymous = mongoose.model("Anony", anonymousInfoSchema);



app.get("/form/:network", (req, res) => {
  if (req.isAuthenticated()) {
    Dataplan.find({ networkName: req.params.network }).then((result) => {
      res.render("backend/dashboard/form", { network: req.params.network, userInfo: req.user, dataPlans: result });
    })
  } else {
    res.redirect("/sign-in");
  }
})
// Network Selections
function networkID(network) {
  var networkID;
  if (network === "MTN") {
    networkID = 1;
  } else if (network === "GLO") {
    networkID = 2;
  } else if (network === "AIRTEL") {
    networkID = 3;
  } else if (network === "9Mobile") {
    networkID = 6;
  } else {
    console.log("Not a network");

  }
  return networkID;
}
// DATA TOPINGS FROM WALLET
app.post("/topit", (req, res) => {
  console.log(req.body.dataplan);
  console.log(req.body.select);

  switch (req.body.select) {
    case 'wallet':
      if (req.isAuthenticated()) {
        const planID = Number(req.body.dataplan);
        console.log("network is " + req.body.network);
        const topPhone = req.body.phoneNum;
        const networkId = networkID(req.body.network);
        console.log(req.user.id);

        // console.log(planID);





        // console.log("Getting All my Data "+ result);

        Dataplan.findOne({ bundleCode: req.body.dataplan }).then((plan) => {
          User.findById(req.user.id).then((userFound) => {
            topUp.mobileData(networkId, planID, topPhone).then((results) => {
              let result = JSON.parse(results);
              console.log(result);
              console.log(result.Status);
              console.log(result.mobile_number);



              userFound.wallet_balace = userFound.wallet_balace - plan.amount;
              userFound.save();
              // res.send(result);

              console.log("MY RESULT FOR DATA IS" + result);
              // const Activity = mongoose.model("Activity",activitySchema);
              Activity.create({
                userId: req.user.id,
                fullname: _.capitalize(req.user.firstname + " " + req.user.lastname),
                email: _.capitalize(req.user.username),
                orderId: result.ident,
                networkName: result.plan_network,
                phone: result.mobile_number,
                bundleType: "Data",
                bundleSize: result.plan_name,
                bundleDuration: result.duration,
                amount: plan.amount,
                bundleCode: plan.bundleCode,
                date: result.create_date,
                status: result.Status,
                profitLoss: Number((plan.amount - plan.apiAmount).toFixed(2)),


              }).then((sent) => {
                res.redirect(`/invoice?planInfo=${encodeURIComponent(results)}`);
              }).catch((e) => {
                console.log(e);

              })




              //  res.send(JSON.parse(result));
              //  const jResult = JSON.parse(result);
              //  res.send(jResult);
              //  console.log("results are "+ jResult);

              // res.render("backend/dashboard/payment-invoice",{userInfo:req.user, planInfo:jResult});
              // res.redirect(`/`)



            }).catch((e) => {
              console.log(e);

            })

          }).catch((e) => {
            console.log(e);

          })

          // res.send(JSON.parse(result));
          // res.render("backend/dashboard/payment-invoice",{userInfo:req.user, planInfo:jResult});

        }).catch((err) => {
          console.log(err);

        })
      } else {
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



app.get("/invoice", (req, res) => {
  if (req.isAuthenticated()) {
    const paymentInfo = JSON.parse(req.query.planInfo);
    console.log(paymentInfo.duration);

    Dataplan.findOne({ bundleCode: paymentInfo.plan }).then((planFound) => {
      console.log(planFound);

      res.render("backend/dashboard/payment-invoice", { userInfo: req.user, planInfo: paymentInfo, amount: planFound.amount });
    })
  } else {
    res.redirect("/sign-in");
  }
})

app.get("/invoice-airtime", (req, res) => {
  if (req.isAuthenticated()) {
    const paymentInfo = JSON.parse(req.query.airtimeInfo);
    console.log(paymentInfo.plan_network);

    // Dataplan.findOne({ bundleCode: paymentInfo.plan }).then((planFound) => {
    // console.log(planFound);

    res.render("backend/dashboard/payment-in-airtime", { userInfo: req.user, planInfo: paymentInfo, amount: paymentInfo.plan_amount });
    // })
  } else {
    res.redirect("/sign-in");
  }
})




app.get("/dbpush", (req, res) => {
  Dataplan.find({}).then((result) => {
    res.render("dataplan", { plans: result });
  })
})

app.post("/dataplan", async (req, res) => {

  var amt = Number(req.body.amount);

  const dPlans = {
    networkName: _.upperCase(req.body.nname),
    bundleType: req.body.btype,
    bundleSize: _.upperCase(req.body.bsize),
    bundleDuration: _.capitalize(req.body.dur),
    apiAmount: req.body.apiamount,
    amount: amt,
    bundleCode: req.body.bcode,
  }
  console.log(dPlans);

  await Dataplan.create(dPlans).then(() => {
    Dataplan.find({}).then((result) => {
      res.render("dataplan", { plans: result });
    })
  })

})


app.get("/t", (req, res) => {
  // res.redirect("/tt");
  const v2 = { age: "31", sex: "male" };
  vv2 = JSON.stringify(v2);

  res.redirect(`/tt?secv=${encodeURIComponent(vv2)}`);
})

app.get("/tt", (req, res) => {

  const data = req.query.secv;
  // const data2 
  const data2 = JSON.parse(data);
  console.log(data2.age);


  // res.send(data.age)
  res.render("backend/dashboard/testi", { myv: "one is Farouk", secv: data2 })
})


app.post("/submitpin", (req, res) => {
  if (req.isAuthenticated()) {
    const pin = req.body.pin; // Retrieve PIN from request body
    console.log('Received PIN:', pin);

    User.findById(req.user.id).then((userPin) => {
      if (pin.length === 4) {
        userPin.trans_pin = pin;
        userPin.save();
        res.json({ message: 'PIN accepted!' }); // Send success response
      } else {
        res.status(400).json({ message: 'Invalid PIN' }); // Send error response
      }
    })

  } else {
    res.redirect("/sign-in");
  }


})

app.get("/airtime", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("backend/dashboard/buyairtime",
      { userInfo: req.user });
  } else {
    res.redirect("/sign-in");
  }
})


function calcuatePL(networkID, amount) {
  var profitLoss;
  if (networkID === "MTN" || networkID === "1" || networkID === 1) {
    profitLoss = ((amount / 100) * 2)
    console.log("profit loss is " + profitLoss);

  } else if (networkID === "GLO" || networkID === "2" || networkID === 2) {
    profitLoss = ((amount / 100) * 4.5)
  } else if (networkID === "AIRTEL" || networkID === "3" || networkID === 3) {
    profitLoss = ((amount / 100) * 1)
  } else if (networkID === "9MOBILE" || networkID === "6" || networkID === 6) {
    profitLoss = ((amount / 100) * 2.5)
  } else {
    console.log("Not a network");

  }
  return profitLoss;

}

app.post("/airtime", (req, res) => {

  if (!req.isAuthenticated()) {
    res.redirect("/sign-in");
  }


  const phone = req.body.phone;
  const amount = Number(req.body.amount);
  const network = Number(req.body.network);


  // I WILL COME BACK FOR airtime, SAVE AND TREATE DATA FIRST
  // const activities = {
  //   userId:req.user.id,
  //   fullname:_.capitalize(req.user.firstname+" "+req.user.lastname),
  //   email:_.capitalize(req.user.username),
  //   networkName:networkID(network),
  //   bundleType:"Airtime",
  //   amount:amount,
  //   date: new Date.now(),
  //   status:false,
  // };

  if (req.isAuthenticated()) {
    console.log("Authenticated");
    User.findById(req.user.id).then((userFound) => {
      console.log("User FOund");
      topUp.airtime(network, amount, phone).then((results) => {
        console.log("MY AIRTIME RESULT IS ");
        let result = JSON.parse(results);
        console.log(result);
        console.log(result.Status);
        console.log(result.mobile_number);


        // if (result.Status === "successful") {

        console.log("aitime");
        userFound.wallet_balace = userFound.wallet_balace - (amount / 100) * 99;
        userFound.save();

        Activity.create({
          userId: req.user.id,
          fullname: _.capitalize(req.user.firstname + " " + req.user.lastname),
          email: _.capitalize(req.user.username),
          orderId: result.id,
          networkName: result.plan_network,
          phone: result.mobile_number,
          bundleType: "Airtime-VTU",
          // bundleSize:result.plan_name,
          // bundleDuration:result.duration,
          amount: amount,
          // bundleCode:plan.bundleCode,
          date: result.create_date,
          status: result.Status,
          profitLoss: Number(calcuatePL(network, amount)),


        }).then((send => {

          res.redirect(`/invoice-airtime?airtimeInfo=${encodeURIComponent(results)}`);
          // res.send("Airtime Paid");

        })).catch((e => {
          res.send(e);

        }));
        // }








      }).catch((e) => {
        console.log(e);

      })




    }).catch((e) => {
      console.log(e);

    })
  } else {
    res.redirect("/sign-in");
  }

})





// //////////////////////////////////////////////////////
const nombapay = require("./middleware/nomba_pay.js");
const { send } = require('process');
app.get("/testing-me", async (req, res) => {
  const data = await nombapay();
  // console.log();
  res.redirect(data.data.checkoutLink);





  // res.send("I am here");
})


// Admin Wallet Toping
app.post("/walletAdminTopup", (req, res) => {
  // {userid, amount} req.body;

  console.log(req.body.userid);

  User.findById(req.body.userid).then((userFound) => {
    userFound.wallet_balace = userFound.wallet_balace + Number(req.body.amount);
    userFound.save();
    setTimeout(function () {

      res.json({
        status: "success",
        message: "Wallet topped"
      });
      // location.reload();
    }, 1500); // 3000ms = 2 seconds




  }).catch((e) => {
    console.log(e);

  })


  console.log(req.body.amount);




})

// Making User Admin
app.post("/make-admin", (req, res) => {
  if (req.isAuthenticated()) {
    if (req.user.isAdmin) {
      User.findById(req.body.userid).then((userFound) => {
        userFound.isAdmin = true;
        userFound.save();

        setTimeout(function () {

          res.json({
            status: "success",
            message: "Wallet topped"
          });
          // location.reload();
        }, 1500); // 3000ms = 2 seconds
      }).catch((e) => {
        console.log(e);

      });
    }
  }
});


// Deleting User ADMIN
app.post("/delete-user", (req, res) => {
  if (req.isAuthenticated()) {
    if (req.user.isAdmin) {
      User.deleteOne({ _id: req.body.userid }).then((userFound) => {
setTimeout(function () {

          res.json({
            status: "success",
            message: "Wallet topped"
          });
          // location.reload();
        }, 1500); // 3000ms = 2 seconds
        

        }).catch((e) => {
          console.l
        });

}}
  });

app.get("/edit-plan/:network", (req, res) => {
  console.log("We are here");
  
  const network = _.upperCase(req.params.network);
  console.log(network);
  

  if(!req.isAuthenticated()){
    res.redirect("/sign-in");

  }

  Dataplan.find({ networkName: network }).then((result) => {
    res.render("backend/dashboard/edit-data",{userInfo:req.user,plans:result});
  }


).catch((e)=>{
  res.send(e)
});
    

})


app.post("/save-new-dataplan", (req, res) => {
  //  const {
  //       bundlecode,
  //       nname,
  //       bun_type,
  //       size,
  //       dura,
  //       api_cost,
  //       cost
  //   } = req.body;
  // console.log(req.body);
  console.log("here here");
  const {bundlecode,nname,buntype,size,dura,apicost,cost} = req.body
  
   var dataPlans = {
        bundleCode:bundlecode,
        networkName:nname,
        bundleType:buntype,
        bundleSize:size,
        bundleDuration:dura,
        apiAmount:apicost,
        amount:cost,
    };
    Dataplan.create(dataPlans).then((succ)=>{
        res.json({
            status: "success",
            message: "Dataplan Added Successfully!"
          });


    }).catch((e)=>{
      res.send(e)
    });

  
  
  // console.log(req.body.bundle_code, req.body.nname, req.body.bun_type, req.body.size, req.body.dura, req.body.api_cost);
 
  
});

// edit plan
app.post("/edit-dataplan",(req,res)=>{
  const {bundlecode,nname,buntype,size,dura,apicost,cost} = req.body
  console.log(req.body);
  console.log("I am here");
  
  
  
  //  var dataPlans = {
  //       networkName:nname,
  //       bundleType:buntype,
  //       bundleSize:size,
  //       bundleDuration:dura,
  //       apiAmount:apicost,
  //       amount:cost,
  //   };
Dataplan.findOne({bundleCode:bundlecode}).then((resultPlan)=>{
        resultPlan.networkName=nname;
        resultPlan.bundleType=buntype;
        resultPlan.bundleSize=size;
        resultPlan.bundleDuration=dura;
        resultPlan.apiAmount=apicost;
        resultPlan.amount=cost;
        resultPlan.save();
        res.json({
            status: "success",
            message: "Dataplan Added Successfully!"
          });



}).catch((err)=>{
  send(err)
})
});

app.post("/delete-data-plan",(req,res)=>{
  bundlecodeid = req.body.bundlecodeid;
  console.log(bundlecodeid);
  Dataplan.deleteOne({bundleCode:bundlecodeid}).then((result)=>{
    res.json({
      status: "success",
      message: "Dataplan Deleted Successfully!"
    });
  }).catch((err)=>{
    res.send(err)
  })
});

// view all users Transactions Via Admin...
app.get("/transact/:status",(req,res)=>{
  if(req.isAuthenticated() && req.user.isAdmin){
    
  const userStats = req.params.status;
  console.log(userStats);

  if(userStats==="registered-user"){
    Activity.find({}).then((result)=>{
      res.render("backend/dashboard/transact-admin", {userInfo:req.user, transactions:result});
    }).catch((e)=>{
      res.send(e);

    });
  }else{
    Anonymous.find().then((results)=>{
      console.log("finding here");
      // console.log("results are", results);
      
      
      res.render("backend/dashboard/transact-any", {userInfo:req.user, transactions:results});
    }).catch((e)=>{

    });

  }

}else{
  res.redirect("/sign-in");

}

  

});







