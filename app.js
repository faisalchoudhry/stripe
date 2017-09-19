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
// app.get('/', function (req, res) {
    // res.render('index', {});
// });

//Customer List
app.get('/customerList', function (req, res) {
    stripe.customers.list(
    ).then(function (customer) {
        res.send(customer)
    });
});

//Customer Approval
app.get('/customerApproval', function (req, res) {
    console.log("Customer Token: " + req.query.token + req.query.card);
    stripe.charges.create({
        amount: 10000,
        currency: "usd",
        customer: req.query.token
    }).then(function (charge) {
        // Use and save the charge info.
        console.log("Charge Successfully");
        var cus_id = {cusId: req.query.token};
        res.send(cus_id);
    }), function (err, charge) {
        // asynchronously called
        console.log("Charge Failed");
        res.send("Charge Failed");
    };
});

//Approved Account List
app.get('/approvedAccountList', function (req, res) {
    stripe.charges.list(
        function (err, charges) {
            // asynchronously called
            res.send(charges)
        }
    );
});

//Save Customer for later.
app.post("/index", function (req, res) {
    var token = req.body.stripeToken; // Using Express
    var amount = req.body.chargeAmount;
    // var currency = req.body.data-currency;
    var compName = req.body.company_name;
    var name = req.body.name;
    var number = req.body.number;
    var email = req.body.stripeEmail;
    // var card = req.body.card_number;
    // var cvc = req.body.cvc;
    // var month = req.body.month;
    // var year = req.body.year;
    // res.send("token" + token + "compname" + compName + "name" + name + "number" + number + "email" + email);

    // stripe.customers.createSource(
    //     // "cus_BHCrllLXwLq47i",
    //     {
    //         source: token,
    //         object: card,
    //         cvc_check: cvc,
    //         exp_year: year,
    //         exp_month: month,
    //         metadata: {
    //             compName: compName,
    //             name: name,
    //             number: number
    //         }
    //     },
    //     function (err, card) {
    //         // asynchronously called
    //     }
    // );

    stripe.customers.create({
        email: email,
        source: token,
        account_balance: amount,
        // currency: currency,
        metadata: {
            compName: compName,
            name: name,
            number: number
        }
    }).then(function (customer) {
        // YOUR CODE: Save the customer ID and other info in a database for later.
        // res.send("Customer Created Successfully." + customer.id + customer.email + customer.token);
        // return stripe.charges.create({
        //     amount: 1000,
        //     currency: "usd",
        //     customer: customer.id,
        // }, function (err, customer) {
        //     // asynchronously called
        //     console.log('Error in customer creation');
        // });
        res.redirect('/');
    }).then(function (charge) {
        // Use and save the charge info.
    });
});

//Test Example
app.post('/charge', function (req, res) {
    var token = req.body.stripeToken;
    var amount = req.body.chargeAmount;
    var compName = req.body.company_name;
    var name = req.body.name;
    var number = req.body.number;
    var email = req.body.email;
    console.log("token" + token + "amount" + amount + "compname" + compName + "name" + name + "number" + number + "email" + email);
    // var charge = stripe.charges.create({
    //     amount: amount,
    //     currency: "pkr",
    //     source: token
    // }, function (err, charge) {
    //     if (err & err.type === "StripeCardError") {
    //         console.log('Your card was declined');
    //     }
    // });
    console.log('Your payment was successful');
    res.redirect('/paysuccess');
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