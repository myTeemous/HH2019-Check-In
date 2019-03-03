const express = require('express');
const path = require('path');
const GoogleSpreadsheet = require('google-spreadsheet');
const async = require('async');

const router = express.Router();

const rootDir = require('../utilities/paths');

router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'home.html'));
});

router.post('/', (req, res, next) => {
    console.log(req.body.firstname + ' ' + req.body.lastname + ' ' + req.body.email);
    res.send(req.body.firstname + ' ' + req.body.lastname + ' ' + req.body.email);

    const doc = new GoogleSpreadsheet('1ELqh0KKurlnxhAMRNxbHyhjRsyCYHmYSfpec6pGZDYc');
    let sheet;
    let found = false;
 
    async.waterfall([
      function setAuth(step) {
        const creds = require('../client_secret.json');
        doc.useServiceAccountAuth(creds, step);
    },
    function getInfoAndWorksheets(step) {
      doc.getInfo(function(err, info) {
        sheet = info.worksheets[0];
        step();
      });
    },
    function workingWithRows(step) {
      sheet.getRows({
        offset: 1,
        limit: 20,
        orderby: 'last_name'
      }, 
      function( err, rows ) {
        let len = rows.length;
        let targetRow = 0;

        for(let i = 0; i < len; i++) {
            console.log(rows[i].lastname)
          if(rows[i].lastname.toUpperCase() === req.body.lastname.toUpperCase()) {
            targetRow = i;
            found = true;
          }
        }

        if(found) {
            rows[targetRow].district = 'AJAX';
            rows[targetRow].save();
        }

        step();
    });
  }
], function(err){
    if( err ) 
      console.log('Error: '+err);
   });

   if(found === true) {
     res.send({ajax: 'successful'});
   }
});

module.exports = router;