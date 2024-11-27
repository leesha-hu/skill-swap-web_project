const express = require('express');
const path = require('path'); // Import path module
const app = express(); // express instance

// import routes 
const signupRoute = require('./src/routes/signup.js');
const loginRoute = require('./src/routes/login.js');

// use routes
app.use('/signup', signupRoute);
app.use('/login', loginRoute);

// middleware for error handling
app.use((req, res) => {
    res.status(404).json({ message: 'Page not found' });
});

// export express instance 
module.exports = app;