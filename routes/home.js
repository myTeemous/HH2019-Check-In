const express = require('express');
const path = require('path');

const router = express.Router();

//const rootDir = require('../utilities/paths');

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'checkIn.html'));
});

module.exports = router;