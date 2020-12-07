const async = require('async');
const http = require('http');

async.map([process.argv[2], process.argv[3]], function(item, callback){
  let data = '';
  http.get(item, (res) => {
      res.on('data', (chunk) => {
          data += chunk.toString();

      });
      res.on('end', () => {
          callback(null, data);
      });
      res.on('error', (err) => callback(err));
  });
},
    function(err,results){
      if (err) console.log(err);
      console.log(results);
    });
