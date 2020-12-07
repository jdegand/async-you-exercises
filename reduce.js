const async = require('async');
const http = require('http');

async.reduce(['one', 'two', 'three'], 0,
    (memo, item, callback) => {
      http.get(process.argv[2] +`/?number=${item}`, (res) => {
              res.on('data', (chunk) => {
                  memo += Number(chunk);
              });
              res.on('end', () => {
                  return callback(null,memo);
              });
              res.on('error', (err) => {
                  callback(err, null)
              });
      });
    },
    (err, result) => {
        console.log(result);
    }

);
