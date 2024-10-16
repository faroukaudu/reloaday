const Monnify = require("../apis/moni.js");
require('dotenv').config();

async function testMonnify(fullname,email, amount, refRandom, desc) {
    var secretKey = process.env.MONNIFY_SECRET_KEY;
    var apiKey = process.env.MONNIFY_API_KEY;
    var baseUrl = "sandbox.monnify.com";

    const m = new Monnify(secretKey, apiKey, baseUrl);
    const genT = await m.genToken();
    console.log("TOKEN"+genT.responseBody.accessToken);
    console.log();
    

    let requestBody = {
        "amount": amount,  //Round up to 2 Decimal point
        "customerName": fullname,
        "customerEmail": email,
        "paymentReference": refRandom,
        "paymentDescription": desc,
        "currencyCode": "NGN",
        "contractCode":process.env.CONTRACT_CODE.toString(),
        "redirectUrl": "http://localhost:3000",
        "paymentMethods":["CARD", "ACCOUNT_TRANSFER", "USSD", "PHONE_NUMBER", "BANK", "QR"]
    };
    const data = await m.initiatePayment(requestBody, genT.responseBody.accessToken);

    // console.log(data);
    return data;
    // res.redirect(data.responseBody.checkoutUrl);
    
}

module.exports = {
    monnify:testMonnify,
}


// payment.monnify("farouk audu", "fagzy99@gmail.com",roundedAmt, randomize('aA0', 19));