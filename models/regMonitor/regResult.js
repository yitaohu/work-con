var fs = require('fs');
const { URL } = require('url');
var mysql = require('mysql');
var db = require('../mysql/dbconnection');
var FileListProc = require('../filelistproc')

var DataResult = {
    getResult:function (sqlArray, callback) {
        if (!sqlArray) {
            return callback(null,null);
        }
        var result = {}
        async.mapSeries(sqlArray, function(item,cb){
            db.query(Object.values(item)[0], function(err,data){
                if (err) {
                    console.log(err);
                    return cb(err, null);
                }
                
            })
        })
    }
}