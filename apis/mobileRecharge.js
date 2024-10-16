var https = require("https");
const { resolve } = require("path");
require('dotenv').config();

function airtimeRefill (network, amount, phone){
  return new Promise((resolve, reject)=>{
    console.log("inside Promise");
    
    const options = {
      hostname: 'gladtidingsdata.com',
      port: 443,
      path: '/api/topup/',
      method: 'POST',
      headers: {
        Authorization: 'Token '+ process.env.GLADTIDE_AUTH,
        'Content-Type': 'application/json'
      }
    };
  
var airTime = JSON.stringify({
  "network":network,
  "amount":amount,
  "mobile_number":phone,
  "Ported_number":true,
  "airtime_type":"VTU"

  });
  
      const reqPost = https.request(options, function (resPost) {
        let output = '';
        resPost.on('data', function (d) {
            output = output + d;
        });
        resPost.on('end', function () {   
            // logger.info();
            if(output){
              resolve(output);
            }else{
              reject("No Data to Return");
            }
        }); 
      });
      reqPost.on('error', (e) => {
        reject(`Problem with request: ${e.message}`);
       });
    
  
    reqPost.write(airTime);
    reqPost.end();

  });

}




function dataBuy (network, planID, phoneNumber){
  return new Promise((resolve, reject)=>{
    console.log("inside Promise");
    
    const options = {
      hostname: 'gladtidingsdata.com',
      port: 443,
      path: '/api/data/',
      method: 'POST',
      headers: {
        Authorization: 'Token '+ process.env.GLADTIDE_AUTH,
        'Content-Type': 'application/json'
      }
    };
  
    var buyData = JSON.stringify({
        // "id":108283,
    "network":network,
    "mobile_number":phoneNumber,
    "plan":planID,
    "Ported_number":true });
  
      const reqPost = https.request(options, function (resPost) {
        let output = '';
        resPost.on('data', function (d) {
            output = output + d;
        });
        resPost.on('end', function () {   
            // logger.info();
            if(output){
              resolve(output);
            }else{
              reject("No Data to Return");
            }
        }); 
      });
      reqPost.on('error', (e) => {
        reject(`Problem with request: ${e.message}`);
       });
    
  
    reqPost.write(buyData);
    reqPost.end();

  });

}

function testme (){
  console.log("Getting Airtime");
}

module.exports = {
  airtime:airtimeRefill,
  mobileData:dataBuy,
  test:testme,

}




// var airTime = JSON.stringify({
//   "network":network,
//   "amount":amount,
//   "mobile_number":phone,
//   "Ported_number":true,
//   "airtime_type":"VTU"

//   });