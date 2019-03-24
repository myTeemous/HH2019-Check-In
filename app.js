//package dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressHBS = require('express-handlebars');

//utility modules
const rootDir = require('./utilities/paths');

//initialize express app
const app = express();

//setup HandleBars template engine
app.engine('hbs', expressHBS());
app.set('view engine', 'hbs');

//routes 
const homeRoutes = require('./routes/home');
const registerRoutes = require('./routes/register');

//middleware used for all routes
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(rootDir, 'public')));

app.use(homeRoutes);
app.use(registerRoutes);

app.listen(3000);