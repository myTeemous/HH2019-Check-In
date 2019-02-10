const express = require('express');
const path = require('path');

const router = express.Router();

const rootDir = require('../utilities/paths');

router.get('/register', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'register.html'));
});

router.post('/register', (req, res, next) => {
    console.log(req.body.firstname + ' ' + req.body.lastname + ' ' + req.body.email);
    res.send(req.body.firstname + ' ' + req.body.lastname + ' ' + req.body.email);
});

module.exports = router;