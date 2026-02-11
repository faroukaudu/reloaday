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

function gladtidingsdata() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "www.gladtidingsdata.com",
      port: 443,
      path: "/api/user/",
      method: "GET",
      headers: {
        Authorization: `Token ${process.env.GLADTIDE_AUTH}`,
        Accept: "application/json",
      },
    };

    const req = https.request(options, (res) => {
      let output = "";

      res.on("data", (chunk) => (output += chunk));
      res.on("end", () => {
//         console.log("STATUS:", resPost.statusCode);
// console.log("BODY:", output);
        if (!output) return reject("No Data to Return");

        // handle non-2xx cleanly
        if (res.statusCode < 200 || res.statusCode >= 300) {
          return reject(`HTTP ${res.statusCode}: ${output}`);
        }

        try {
          resolve(JSON.parse(output));
        } catch (e) {
          reject(`Response not JSON: ${output}`);
        }
      });
    });

    req.on("error", (e) => reject(`Problem with request: ${e.message}`));
    req.end();
  });
}

module.exports = {
  airtime:airtimeRefill,
  mobileData:dataBuy,
  gladUser:gladtidingsdata
  // test:testme,

}




// var airTime = JSON.stringify({
//   "network":network,
//   "amount":amount,
//   "mobile_number":phone,
//   "Ported_number":true,
//   "airtime_type":"VTU"

//   });