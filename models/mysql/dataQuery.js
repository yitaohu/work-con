var async = require('async');


var QueryCreate = require('./queryCreate');
var db = require('./dbconnection');
var FileListProc = require("../filelistproc");
var Tools = require('../tools');
var Convergence = require('../convergence');


var DataQuery = {
    queryData: function (qValue, callback) {
        console.log(qValue);
        async.waterfall([
            async.apply(FileListProc.getTestFromFileList,qValue.testListPath),
            function(arg1,callback) {
                qValue.testListPath = arg1;
                sqlArray = QueryCreate.createQueryArray(qValue);
                callback(null, sqlArray, qValue);
            },
            DataQuery.getResult

        ],function (err, data) {
            if (err) {
                console.log("dataQuery " + err);
            }
            if (data) {
                return callback(err,data);
            }
        })


    },
    getResult: function (sqlArray, qValue,callback) {
        if (!sqlArray) {
            return callback(null, null);
        }
        var result = {};
        async.mapSeries(sqlArray, function (item, cb) {
            db.query(Object.values(item)[0], function (err, data) {
                if (err) {
                    console.log(err);
                    return cb(err, null);
                }
                if (data && data.length != 0) {
                    var object = {};
                    testNamekey = Object.keys(item)[0];
                    object[testNamekey] = qValue.resultsDir + "/" + testNamekey + "/v19.1.0/" + data[0].Testdir//version number  
                    Convergence.getConvNum(object[testNamekey], function (err, data) {
                        if (err) {
                             console.log("dev.getConvNumArray" + err);
                            return cb(err, null);
                        }
                        if (data) {
                            data.forEach(function (element) {
                                convFileName = Object.keys(element)[0];
                                testname = testNamekey + "||"
                                        + convFileName.slice(0, convFileName.length - 11);
                                result[testname] = [Object.values(element)[0], object[testNamekey]];
                            });
                            return cb(null, data);
                        }
                    })
                }
            })
        }, function (err, res) {
            if (err) {
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        })

    }
};
module.exports = DataQuery;

