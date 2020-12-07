const async = require('async');
const http = require('http');
const url = `http://${process.argv[2]}:${process.argv[3]}`;

/*
let createUser = function(id, callback) {
    callback(null, {
        user_id: id + 1
    });
};

// generate 5 users
async.times(5, function(n, next) {
    createUser(n, function(err, user) {
        next(err, user);
    });
}, function(err, users) {
    if(err) console.log(err)
    console.log(users)
});

async.series({
    post: function(callback) {
      let data = '';
      http.request(url, (res) => {
        async.times(5, function(n, next) {
            createUser(n, function(err, user) {
                next(err, user);
            });

          res.on('data', (chunk) => {
              data += chunk.toString();
              createUser(data);
          });
          res.on('end', () => {
              callback(null, data);
          });
          res.on('error', (err) => callback(err));
      });
      function done(err, users) {
          if(err) console.log(err)
          console.log(users)
      };
    })},
    get: function(callback){
      let data = '';
      http.get(url, (res) => {
          res.on('data', (chunk) => {
              data += chunk.toString();

          });
          res.on('end', () => {
              callback(null, data);
          });
          res.on('error', (err) => callback(err));
      });
    }
}, function(err, result) {
    if(err) console.log(err);
    console.log(result.get);
});
*/

async.series(
  {
    post: next => {
      async.times(5, function getPosts(id, next){
        const postData = JSON.stringify({ user_id: id + 1 });

        const options = {
          method: "POST",
          hostname: process.argv[2],
          port: process.argv[3],
          path: "/users/create",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        };
        const req = http.request(options, res => {});
        req.write(postData);
        req.end();
        next(null);
      }, (err, result) => {
        next(err, result);
      });
    },
    get: function getFunction(next){
      const url = `http://${process.argv[2]}:${process.argv[3]}`;

      http.get(url, res => {

        let httpResult = "";

        res.on("data", chunk => {
          httpResult += chunk.toString();
        });
        res.on("end", () => {
            next(null, httpResult);
          })
          .on("err", err => {
            next(err);
          });
      });
    }
  },
  (err, result) => {
    if(err) console.log(err);
    console.log(result.get);
  }
);
