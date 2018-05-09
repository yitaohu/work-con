var async = require('async');


var QueryCreate = require('./queryCreate');
var db = require('./dbconnection');
var FileListProc = require("../filelistproc");
var Tools = require('../tools');
var Convergence = require('../convergence');


var DataQuery = {
    queryData: function (qValue, callback) {
        async.waterfall([
            async.apply(FileListProc.getTestFromFileList, qValue.testListPath),
            function (arg1, callback) {
                qValue.testListPath = arg1;
                sqlArray = QueryCreate.createQueryArray(qValue);
                callback(null, sqlArray, qValue);
            },
            DataQuery.getResult

        ], function (err, data) {
            // console.log("dataquery.querydata+++++++++++++++")
            // console.log(data);
            if (err) {
                console.log("dataQuery " + err);
                return callback(err, null);
            }
            return callback(null, data)
        })


    },
    getResult: function (sqlArray, qValue, callback) {
        if (!sqlArray) {
            return callback(null, null);
        }
        var result = {};
        result["Not_Run_Std"] = [];
        result["Failed_Std"] = [];
        async.mapSeries(sqlArray, function (item, cb) {
            db.query(Object.values(item)[0], function (err, data) {
                if (err) {
                    console.log(err);
                    return cb(err, null);
                }
                if (data && data.length != 0) {
                    var object = {};
                    testNamekey = Object.keys(item)[0];
                    if (data[0].Result != 'S') {
                        var failTest = {};
                        failTest[testNamekey] = [data[0].Result, data[0].Bug];
                        result["Failed_Std"].push(failTest);
                    }
                    object[testNamekey] = qValue.resultsDir + "/" + testNamekey + "/v" + qValue.Version+"/" + data[0].Testdir//version number  
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
                } else {
                    result["Not_Run_Std"].push(Object.keys(item)[0]);
                    return cb(null, null);
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

