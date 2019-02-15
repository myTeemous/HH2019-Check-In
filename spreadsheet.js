const GoogleSpreadsheet = require('google-spreadsheet');
const async = require('async');
 
const doc = new GoogleSpreadsheet('1ELqh0KKurlnxhAMRNxbHyhjRsyCYHmYSfpec6pGZDYc');
let sheet;
let name = 'CARDIN';
 
async.waterfall([
  function setAuth(step) {
    const creds = require('./client_secret.json');
 
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
    }, function( err, rows ) {
      let len = rows.length;
      let targetRow = 0;

      for(let i = 0; i < len; i++) {
        if(rows[i].lastname.toUpperCase() === name)
        targetRow = i;
      }

      rows[targetRow].district = 'Test';
      rows[targetRow].save();

      step();
    });
  }
], function(err){
    if( err ) {
      console.log('Error: '+err);
    }
});