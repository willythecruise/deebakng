


const axios = require('axios');
require('dotenv').config()

var ConfirmPayment= async function ConfirmPaystack(req,res,reference){
try {
    
    const response = await axios( {
        headers: {
            // sk_live_535fc1144a5849630180495a0633135e33ae619b
            //sk_test_1b0fe5a8cba780c0459376f7c1e5bc8eb52d6d8d
           Authorization: 'Bearer sk_test_c83b9201593fcb67d67f84b03397526b6323428c',
            ContentType: 'application/json'
        },
        method: 'get',
        url: 'https://api.paystack.co/transaction/verify/' + reference,
    })
    
    return response
} catch (err) {
    console.log(err);
    
}}


var MakePayment= async function Paystack(req,res,amount,course){
try {
     
    const response = await axios( {
        headers: {
           Authorization: 'Bearer sk_test_c83b9201593fcb67d67f84b03397526b6323428c' ,
            ContentType: 'application/json'
        },
        method: 'post',
        url: 'https://api.paystack.co/transaction/initialize',
        data: {
            
            currency: "NGN",
            callback_url: process.env.PAYPAL_REDIRECT_URL + course,
            email: 'deebak@gmail.com',
            amount:amount + '00'
            }
        
    })
    // console.log(response)
    return response
} catch (err) {
    console.log(err);
    
}
}

module.exports.MakePayment= MakePayment;
module.exports.ConfirmPayment= ConfirmPayment;