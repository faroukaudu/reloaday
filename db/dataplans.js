const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
// var db = require(__dirname + "/connection.js");
mongoose.set('strictQuery', true);

const mobileNetworkSchema = new mongoose.Schema({
    networkName:String,
    bundleType:String,
    bundleSize:String,
    bundleDuration:String,
    amount:Number,
    bundleCode:String,

  },
  
  );

  module.exports = mobileNetworkSchema;