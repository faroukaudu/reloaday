const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
// var db = require(__dirname + "/connection.js");
mongoose.set('strictQuery', true);




const anonymousInfoSchema = new mongoose.Schema({
  triggerRef:String,
  triggerType:String,
  amount:Number,
  userDelivery:Boolean,
  phone:String,
  network:String,
  email:String,
  successful:Boolean,
  type:String,
  plan:String,
  

 

},
{timestamps: true}

);

// userInfoSchema.plugin(passportLocalMongoose , {selectFields: "username password"});


module.exports = anonymousInfoSchema;
