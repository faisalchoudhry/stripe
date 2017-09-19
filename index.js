/**
 * Created by faisal on 8/25/2017.
 */
// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys

var express = require("express");
var stripe = require("stripe")("sk_test_QpO6f3ESy6hfbGzKzdVwrbBx");
var hbs = require("hbs");
var bodyParser = require("body-parser");
var http = require("http");
var app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Render index file
app.get('/', function (req, res) {
    res.render('index', {});
});


//Create Server
app.listen(8080, function () {
    console.log("Stripe is running");
});
//
// // var token = req.body.stripeToken; // Using Express
// app.post('/charge', function (req, res) {
//     console.log('Running');
//     // var token = req.body.stripeToken;
//     // var card = stripe.customers.createSource(
//     //     "cus_BGvEw0jVAyd8Fh",
//     //     { source: token },
//     //     function(err, card) {
//     //         // asynchronously called
//     //     }
//     // );
// });
// // var token = stripe.body.stripeToken; // Using Express
// // stripe.customers.create({
// //     email: "faisalchoudhry06@gmail.com",
// //     source: token
// // }).then(function (customer) {
// //     // YOUR CODE: Save the customer ID and other info in a database for later.
// //     console.log("Stripe is running");
// //     // return stripe.charges.create({
// //     //     amount: 1000,
// //     //     currency: "usd",
// //     //     customer: customer.id,
// //     // }, function (err, customer) {
// //     //     // asynchronously called
// //     //     console.log('Error in customer creation');
// //     // });
// //     // res.redirect('/paysuccess');
// // }).then(function (charge) {
// //     // Use and save the charge info.
// // });
// // });
// app.listen(8080, function () {
//     console.log("Stripe is running");
// });