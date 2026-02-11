// nomba_pay_route.js
const https = require("https");
const crypto = require("crypto");
const { URL } = require("url");
const { log } = require("handlebars");
require('dotenv').config();


function genReference(prefix = "ORD") {
  const rnd = Math.floor(Math.random() * 1e9).toString().padStart(9, "0");
  return `${prefix}_${Date.now()}_${rnd}`;
}
// -------------------------
// ✅ PUT YOUR CONSTANTS HERE
// -------------------------
      // Bearer token (already generated)
const myAccountId = process.env.NOMBA_ACC_ID;
const myClientId = process.env.NOMBA_CLIENT_ID_LIVE;
const myClientSecret = process.env.NOMBA_PRIVATE_KEY_LIVE;

// const accessNewToken = '';
// const refreshToken ='';

// console.log( "  THIS IS MY NEW TOKEN >><>>>>>>>>>>>>>>>>>",accessNewToken);

// const options = {
//   method: 'POST',
//   headers: {accountId: myAccountId, 'Content-Type': 'application/json'},
//   body: JSON.stringify({
//     grant_type: 'client_credentials',
//     client_id: myClientId,
//     client_secret: myClientSecret
//   })
// };




async function accessToken (){
    
     const options = {
  method: 'POST',
  headers: {accountId: myAccountId, 'Content-Type': 'application/json'},
  body: JSON.stringify({
    grant_type: 'client_credentials',
    client_id: myClientId,
    client_secret: myClientSecret,
  })
};

// https://api.nomba.com/v1/auth/token/issue

const apiFecther = await fetch('https://api.nomba.com/v1/auth/token/issue', options)
  .then(res => res.json())
  .then(res => {
    // accessNewToken = res.data.access_token;
    refreshToken = res.data.refresh_token;  
    return res;
  })
  .catch(err => console.error(err));

  return apiFecther;

}


async function paymentCheckOut (fullname, email, amount, id, desc){
    console.log("loading response");
    
    let response = await accessToken();
    // console.log(response);
        const accessNewToken = response.data.access_token;
    const refreshToken =response.data.refresh_token;
    // console.log(accessNewToken);

    
                    const options = {
                method: 'POST',
                headers: {
                    accountId: myAccountId,
                    Authorization: 'Bearer '+accessNewToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order: {
                    callbackUrl: 'http://localhost:3000/dashboard',
                    customerEmail: email,
                    amount: amount,
                    currency: 'NGN',
                    orderReference: genReference(),
                    customerId: fullname + id,
                    accountId: myAccountId,
                    // splitRequest: {
                    //     splitType: 'PERCENTAGE',
                    //     splitList: [{accountId: '01a10aeb-d989-460a-bbde-9842f2b4320f', value: '65.45'}]
                    // }
                    },
                    tokenizeCard: 'true'
                })
                };

        const checkOut = await fetch('https://api.nomba.com/v1/checkout/order', options)
        .then(res => res.json())
        .then(res =>{
            return res;
        })
        .catch(err => console.error(err));

        return checkOut;
}


 

  module.exports = paymentCheckOut;