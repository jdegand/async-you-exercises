const async = require('async');
const http = require('http');
/*
const httpRequest = (callback) => {
    let body = '';
    http.get(process.argv[2], (res) => {
        res.on('data', (chunk) => {
            body += chunk.toString();
          })
        res.on('end', () => {
            callback(null, body !== 'meerkat');
        });
        res.on('error', (err) => callback(err));
    });
  }

let count = 1;

async.whilst(
    callback => httpRequest(callback),
    callback => {count++; callback(null)},
    function (err, result) {
        if(err) console.log(err);
        console.log(count);
    }
);
*/

let text = '';

let count = 0;

   async.whilst(
     function(callback) {
      return callback(null, text !== 'meerkat');
     },

function(done){
  var body = '';
  http.get(process.argv[2], function(res){
    res.on('data', function(chunk){
      body += chunk.toString();
    });

    res.on('end', function(){
      ++count;
      text = body;
      done();
    });
  }).on('error', done);
},

function(err){
  if (err) return console.log(err);
  console.log(count);
}
)
