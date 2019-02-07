//package dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//initialize express app
const app = express();

//routes 
const homeRoutes = require('./routes/home');

//middleware used for all routes
app.use(bodyParser.urlencoded({extended: false}));

app.use(homeRoutes);

app.listen(3000);