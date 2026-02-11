const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
// var db = require(__dirname + "/connection.js");
mongoose.set('strictQuery', true);

const activitySchema = new mongoose.Schema({
    userId:String,
    fullname:String,
    email:String,
    orderId:String,
    networkName:String,
    bundleType:String,
    bundleSize:String,
    phone:String,
    bundleDuration:String,
    amount:Number,
    bundleCode:String,
    status:String,
    date:String,
    
    

  },
  {timestamps: true}
  
  );

  module.exports = activitySchema;