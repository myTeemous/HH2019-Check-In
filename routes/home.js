const express = require('express');
const path = require('path');

const router = express.Router();

const rootDir = require('../utilities/paths');

router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'home.html'));
});

router.post('/', (req, res, next) => {
    console.log(req.body.firstname + ' ' + req.body.lastname);
    res.send(req.body.firstname + ' ' + req.body.lastname);
});

module.exports = router;