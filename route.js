const express = require('express');
const app = express(); // express instance

// import routes 
const signupRoute = require('./src/routes/signup.js');

// use routes
app.use('/', signupRoute);

// export express instance 
module.exports = app;