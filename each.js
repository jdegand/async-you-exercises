const async = require('async');
const http = require('http');

async.each([process.argv[2], process.argv[3]], function(item, done){
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
    function(err){
      if (err) console.log(err);
    });
