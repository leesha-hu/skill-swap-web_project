// import files
require("dotenv").config()
const express = require('express');
const bodyParser = require('body-parser');
const session = require("express-session");
const router = require('./route.js');

// create instance of express application
const app = express();

// middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/', router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('listening at port ' + port);
})