var mysql = require('mysql');
var async = require('async');

var Query = require('./query');
var db = require('./dbconnection');
var FileListProc = require("../filelistproc");
var Tools = require('../tools');


var Task = {
    getAllTasks: function (callback) {
        myquery = "SELECT * FROM reg_191 WHERE Testname in ('3d_fwh_steady','cyl2d_edb_fwh') AND Platform=? AND ThePrecision='dp' AND Threads='8' AND TimeDateStamp between '2018-03-30 14:37:11' and '2018-04-03 14:37:13'";
        // testNameArray = ""
        return db.query(myquery,'lnamd64',callback);
    },
    getTest: function (qValue, callback) {

        qValue.testListPath = Tools.addFileToPath(qValue.testListPath);
        FileListProc.getTestFromFileList(qValue.testListPath, function(err, res){
            if(err) {
                console.log(err);
            }
           
            qValue.testListPath = res;
            sqlArray = Query.createQueryArray(qValue);

            var result = [];

            if (sqlArray) {
                async.mapSeries(sqlArray, function(item, cb) {
                    db.query(Object.values(item)[0], function(err,data){
                        if (err) {
                            console.log(err);
                            return cb(err, null);
                        }
                        if (data && data.length != 0) {
                            // console.log("+++++++++++++++++++++");
                            var object = {};
                            testNamekey = Object.keys(item)[0];
                            object[testNamekey] = data[0].Testdir;
                            // console.log(object);
                            result.push(object);
                            // console.log(data);
                            return cb(null,data);
                        }
                    })
                },function(err, res){
                    if(err) {
                        return callback(err,null);
                    } else {
                        return callback(null, result);
                    }
                })
            }
        

        });
        
    }
};
module.exports = Task;

