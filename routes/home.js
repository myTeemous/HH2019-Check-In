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
    const doc = new GoogleSpreadsheet('13_wvQpyRrvTpSD12jB9iEVvNKIUPk6jxWijmDLnpDec');
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
          orderby: 'lastname'
        }, 
        function( err, rows ) {
          let len = rows.length;
          let targetRow = 0;

          for(let i = 0; i < len; i++) {
            if((rows[i].lastname.toUpperCase() === req.body.lastname.toUpperCase()) && (rows[i].firstname.toUpperCase() === req.body.firstname.toUpperCase())) {
              targetRow = i;
              found = true;
            }
          }

          if(found) {
              rows[targetRow].checkin = 'IN';
              rows[targetRow].save();
              res.json({userFound: 1});
          }
          else {
            res.json({userFound: 0});
          }
          step();
      });
    }
  ], function(err){
      if( err ) 
        console.log('Error: ' + err);
    }); //waterfall function ends here
});

module.exports = router;