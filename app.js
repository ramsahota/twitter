var express = require('express');
var app = express();
var main = require('./db.js');

app.get('/user', function (req, res) {
//     main.query(function(err,data) {
//     if(err){
//         res.send(err);
//     }
//         res.send(data);
// },'user')
    makePromise(res,'user');
});

app.get('/tweet', function (req, res) {
//     main.query(function(err,data) {
//     if(err){
//         res.send(err);
//     }
//         res.send(JSON.stringify(data));
// },'tweet')
    makePromise(res,'tweet');
});

app.get('/like', function (req, res) {
//     main.query(function(err,data) {
//     if(err){
//         res.send(err);
//     }
//         res.send(JSON.stringify(data));
// },'like')
    makePromise(res,'like');
});

function makePromise(res,tableName) {
    var promise = main.query(tableName);
    promise.then(
        (resolve)=>{
            res.send(resolve);
        }
    ).catch(
        (reject)=>{
            console.log(reject);
        }
    );
}

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
