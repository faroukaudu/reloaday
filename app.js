const myModule = require('./index.js');
const auth = require('./auth.js');
const action = require('./actions.js');
const any = require("./anonymous.js");
const webhook = require("./webhook.js");
const app = myModule.main;




app.listen(3000, function(req,res){
  console.log("server is now starting topup @ port 3000!");
});
