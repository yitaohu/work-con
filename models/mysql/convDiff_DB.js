var async = require('async');


var FileListProc = require('../filelistproc');
var ConvNumArray = require('../convNumArray');
var DataQuery = require('./dataQuery');

var ConvDiff_DB = {
    getDiffNumArray: function(qValue, run2Path, filter, callback) {
        async.series([
            function (cb) {
                DataQuery.queryData(qValue, function(err, r1) {
                    // console.log(r1);
                    if(err) {

                        console.log("1st ConvDiff_DB.getConvNumArray");
                        console.log(err);
                        return cb(err, null);
                    }
                    if (r1) {
                        // console.log(r1)
                        return cb(null, r1);
                    }
                })
            },//qValue changes
            function (cb) {
                // console.log(run2Path);
                // console.log(filter);
                ConvNumArray.getConvNumArray(qValue.testListPath, run2Path, filter, function(err,r1) {
                    if (err) {
                        console.log("2st getConvNumArray" + err);
                        return cb(err, null);
                    }
                    if (r1) {
                        // console.log(r1);
                        return cb(null, r1);
                    }
                })
            },
        ], function (err, diffNum) {
            if (err) {
                console.log("models/dev" + err);
                return callback(err, null);
            }
            // console.log(diffNum);
            resultArray = {};
            for (var key in diffNum[0]) {
                if(diffNum[1][key]) {
                    diff = (diffNum[1][key][0] - diffNum[0][key][0]) / diffNum[0][key][0] * 100;//diff
                    resultArray[key] = [diffNum[0][key][0], diffNum[1][key][0], diff,diffNum[0][key][1], diffNum[1][key][1]];
                }                
                //    console.log(resultArray[key]);
            }
            return callback(null, resultArray);
        })
    }
}

module.exports = ConvDiff_DB;