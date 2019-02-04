const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/',(req, res, next) => {
    res.sendfile(path.join(__dirname, './index.html'));
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});