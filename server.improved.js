const passport = require('passport');
const lowdb = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const express = require('express'),
      app = express(),
      port = 3000;
const adapter = new FileAsync('json/users.json');

// Create database instance and start server
lowdb(adapter)
    .then(db => {
      app.use(express.static('public'));

        app.get('/', (request, response) => {
          response.sendFile(__dirname + 'index.html');
        });

        app.get('/index', (request, response) => {
            response.sendFile(__dirname + 'index.html');
        });

        app.get('/cart', (request, response) => {
            response.sendFile(__dirname + 'cart.html');
        });

        app.get('/login', (request, response) => {
            response.sendFile(__dirname + 'login.html');
        });

        app.get('/register', (request, response) => {
            response.sendFile(__dirname + 'register.html');
        });

        app.get('/store', (request, response) => {
            response.sendFile(__dirname + 'register.html');
        });

        app.get('/loginAttempt', (request, response) => {
            app.use(passport.initialize());
            app.use( passport.session());
            response.write(JSON.stringify(findUser(request, db)));
        });

        app.get('/registerAttempt', (request, response) => {

            response.write(JSON.stringify(registerUser(request, db)));
        });


    })
    .then(() => {
      app.listen(port, () => console.log('listening on port 3000'))
    });

const calculateTotal = function (prices) {
  let total = 0;
  const shippingCosts = 2.49;
  for (let price in prices)
  {
    total += price;
  }
  total += shippingCosts;
  return total;
};

const findUser = async function( request, database ) {
    let email = request["email"];
    let password = request["password"];
    let compareEmail = "";
    let comparePassword = "";
    for(compareEmail in database){
    if(compareEmail === email){
      if(comparePassword === database['password'])
      {
        return "badpass";
      }else{
        return "true";
      }
    }
  }
    return "baduser";
};

const registerUser = async function( request, database ) {
    let email = request["email"];
    let compareEmail = "";
    for(compareEmail in database){
        if(compareEmail === email){
            return "duplicate";
        }
    }
    return "true";
};