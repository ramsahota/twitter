var fs = require("fs");
var file = "twitter.db";
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

// queryTable(function(err,data) {
//     if(err){
//         console.log(err);
//     }
//         console.log(data);
// },'user');

//initDB(db);

function initDB(db) {
    db.serialize(function() {
            var stmt;
            db.run("CREATE TABLE IF NOT EXISTS tweet (date TEXT, text TEXT," +
            " author TEXT, replies TEXT)");
            db.run("CREATE TABLE IF NOT EXISTS user (profile TEXT, name TEXT," +
            " tweet TEXT, follower TEXT, following TEXT, retweets TEXT, directmessage TEXT)");
            db.run("CREATE TABLE IF NOT EXISTS like (tweetid INTEGER, userid INTEGER)");

            addToTable('tweet', '2016-09-30', 'test text', 'ram sahota', 'reply back');
            addToTable('tweet', '2016-09-29', 'test text test', 'ram sahota 1', 'reply back 1');

            addToTable('user', 'profile 1', 'name 1', 'tweet 1', 'follower 1', 'following 1', 'retweet 1', 'dm 1');
            addToTable('user', 'profile 2', 'name 2', 'tweet 2', 'follower 2', 'following 2', 'retweet 2', 'dm 2');

            addToTable('like', 1, 1);
            addToTable('like', 2, 2);

            queryTable('like');

            function  addToTable(...args) {
                var table = args[0];
                var values = "";
                for (var i = 1; i<args.length; i++) {
                    if (i<args.length-1){
                        values += "'"+args[i]+"',";
                    }
                    else {
                        values += "'"+args[i]+"'";
                    }
                }
                stmt = db.prepare("INSERT INTO " + table + " VALUES(" + values+")");
                stmt.run();
                stmt.finalize();
            }
        /*
            db.each("SELECT * from tweet", function (err, row) {
                if (err) {
                    console.log(err);
                }
                console.log(row.rowid + ": " + row.date + ": " + row.text + ": " + row.author + ": " + row.replies);
            });
        */
    });


    exports
}

// var promise = queryTable('user');
// promise.then(
//     (resolve) =>{
//         console.log(resolve);
//     }).catch(
//         (reject) =>{
//             console.log(reject);
//         }
//     );

function queryTable(...args) {
    return new Promise(
        (resolve, reject) => {
    var sqlite3 = require("sqlite3").verbose();
    var db = new sqlite3.Database("twitter.db");
    var table = args[0];
    var sql = ("SELECT * FROM " + table);
    console.log(table);
    //console.log(args);
   // var data = [];
     db.all(sql, function (err, rows)
        {
            if (err) {
                console.log(err);
               // cb(err);
                reject(err);
            }
           // console.log(rows);
           // cb(null, rows);
            resolve(rows);
        });
    });
}

exports.query = queryTable;

db.close();