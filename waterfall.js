const async = require("async");
const fs = require('fs');
const http = require('http');

const read = (callback) => {
    fs.readFile(process.argv[2], (err, data) => {
        if (err)
            console.log(err);
        callback(null, data.toString());
    });
};

const httpRequest = (url,callback) => {
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

async.waterfall([read, httpRequest ] ,(err, result)=> {
    if (err) return console.error(result);
    console.log(result);
});
