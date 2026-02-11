const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
// var db = require(__dirname + "/connection.js");
mongoose.set('strictQuery', true);

// const uri = "mongodb://127.0.0.1:27017/gitportalDB";
// async function database() {
//   await mongoose.connect(uri);
// }
//database().catch(err => console.log(err));



// const cardDetails = new mongoose.Schema({
//   last
// });

const paymentInfoSchema = new mongoose.Schema({
    paymentStatus:String,
    // purchaseID:String,
    transactionRef:String,
    paymentRef:String,
    paymentDesc:String,
    paymentMeth:String,
    networkName:String,
    amountPaid:Number,
    date:String,
    paymentMeth:String,
    token:String,
    checkoutMode:String,
});


const userInfoSchema = new mongoose.Schema({
  username:String,
  firstname:String,
  lastname:String,
  email:{
    type:String,
    unique:true,
    required: true,
  },
  password:String,
  phone:String,
  regDate:String,
  country:String,
  isAdmin:Boolean,
  profile_pic:String,
  wallet_balace:Number,
  trans_pin:String,

  transactions:[paymentInfoSchema],
  dataTransactions:[{dataTransactionID:String, dateTime:String}],

},
{timestamps: true}

);

userInfoSchema.plugin(passportLocalMongoose , {selectFields: "username password"});


module.exports = userInfoSchema;
