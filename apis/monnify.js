var https = require("https");
require('dotenv').config();

var decoder = Buffer.from(process.env.MONNIFY_API_KEY + ":" + process.env.MONNIFY_SECRET_KEY).toString('base64');

function accessToken() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'sandbox.monnify.com',
      port: 443,
      path: '/api/v1/auth/login/',
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + decoder,
        'Content-Type': 'application/json'
      }
    };

    // var userInfo = JSON.stringify({
    //   "amount": 100.00,
    //   "customerName": "Stephen Ikhane",
    //   "customerEmail": "stephen@ikhane.com",
    //   "paymentReference": "123031klsadkad",
    //   "paymentDescription": "Trial transaction",
    //   "currencyCode": "NGN",
    //   "contractCode": "32904822812",
    //   "redirectUrl": "https://my-merchants-page.com/transaction/confirm",
    //   "paymentMethods": ["CARD", "ACCOUNT_TRANSFER"]
    // });

    const reqPost = https.request(options, (resPost) => {
      let output = '';

      resPost.on('data', (chunk) => {
        output += chunk;
      });

      resPost.on('end', () => {
        if (output) {
          resolve(output); // Resolve the Promise with the output
        } else {
          reject("No Data");
        }
      });
    });

    reqPost.on('error', (e) => {
      reject(`Problem with request: ${e.message}`);
    });

    // reqPost.write(userInfo);
    reqPost.end();
  });
}

function payment() {
    
  // Use the accessToken function and handle the Promise
  accessToken()
    .then(result => {
        console.log("Access Token Result: " + JSON.parse(result).responseBody.accessToken);
        var accessTo = JSON.parse(result).responseBody.accessToken;
        const options = {
            hostname: 'sandbox.monnify.com',
            port: 443,
            path: '/api/v1/merchant/transactions/init-transaction/',
            method: 'POST',
            headers: {
              Authorization: "basic "+ accessTo,
              'Content-Type': 'application/json'
            }
          };

          var userInfo = JSON.stringify({
      "amount": 100.00,
      "customerName": "Stephen Ikhane",
      "customerEmail": "stephen@ikhane.com",
      "paymentReference": "123031klsadkad",
      "paymentDescription": "Trial transaction",
      "currencyCode": "NGN",
      "contractCode": "2679710085",
      "redirectUrl": "https://my-merchants-page.com/transaction/confirm",
      "paymentMethods": ["CARD", "ACCOUNT_TRANSFER"]
    });
          const reqPost = https.request(options, function (resPost) {
            let output = '';
            resPost.on('data', function (d) {
                output = output + d;
            });
            resPost.on('end', function () {   
                // logger.info();
                console.log('Final POST result***:\n' + output);
            });
        });
        
        reqPost.write(userInfo);
        reqPost.end();

          
      
      // Do something with the result
    })
    .catch(error => {
      console.error("Error: " + error);
    });
}
payment();

module.exports = {
  monnify: accessToken,
  
};