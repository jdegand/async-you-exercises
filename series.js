const async = require('async');
const http = require('http');

async.series({
    requestOne: function(callback) {
      let data = '';
      http.get(process.argv[2], (res) => {
          res.on('data', (chunk) => {
              data += chunk.toString();

          });
          res.on('end', () => {
              callback(null, data);
          });
          res.on('error', (err) => callback(err));
      });
    },
    requestTwo: function(callback){
      let data = '';
      http.get(process.argv[3], (res) => {
          res.on('data', (chunk) => {
              data += chunk.toString();

          });
          res.on('end', () => {
              callback(null, data);
          });
          res.on('error', (err) => callback(err));
      });
    }
}, function(err, results) {
    if(err) console.log(err);
    console.log(results);
});
