/**
 * Created by faisal on 8/24/2017.
 */
// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
var express = require("express");
var stripe = require("stripe")("sk_test_QpO6f3ESy6hfbGzKzdVwrbBx");
var hbs = require("hbs");
var bodyParser = require("body-parser");

var app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (req, res) {
    res.render('index', {});
});
app.get('/paysuccess', function (req, res) {
    res.render('paysuccess', {});
});
app.post('/charge', function (req, res) {
    var token = req.body.stripeToken;
    var amount = req.body.chargeAmount;
    var compName = req.body.company_name;
    var name = req.body.name;
    var number = req.body.number;
    var email = req.body.email;
    var charge = stripe.charges.create({
        amount: amount,
        currency: "pkr",
        source: token
    }, function (err, charge) {
        if (err & err.type === "StripeCardError") {
            console.log('Your card was declined');
        }
    });
    console.log('Your payment was successful');
    res.redirect('/paysuccess');
});
app.listen(8080, function () {
    console.log("Stripe is running");
});