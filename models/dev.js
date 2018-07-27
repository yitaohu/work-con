var async = require('async');


var FileListProc = require('../models/filelistproc');
var ConvNumArray = require('./convNumArray');


var Dev = {
    getDiffNumArray: function (run1Path, run2Path, filter, TestNameArray, callback) {
        async.series([
            function (cb) {
                ConvNumArray.getConvNumArray(TestNameArray, run1Path, filter, function (err, r1) {
                    if (err) {
                        console.log("1st getConvNumArray" + err);
                        return cb(err, null);
                    }
                    if (r1) {
                        return cb(null, r1);
                    }
                });
            },
            function (cb) {
                ConvNumArray.getConvNumArray(TestNameArray, run2Path, filter, function (err, r1) {
                    if (err) {
                        console.log("2st getConvNumArray" + err);
                        return cb(err, null);
                    }
                    if (r1) {
                        return cb(null, r1);
                    }
                });
            },
        ], function (err, diffNum) {
            if (err) {
                console.log("models/dev" + err);
                return callback(err, null);
            }
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
    },

    getDiffNumberFileList: function (TestListString, run1Path, run2Path, filter, callback) {
        async.waterfall([
            function (cb) {
                cb(null, TestListString);
            },
            FileListProc.getTestFromFileList,
            async.apply(Dev.getDiffNumArray, run1Path, run2Path, filter)

        ], function (err, data) {
            if (err) {
                console.log("dev.getDiffNumberFileList" + err);
                return callback(err, null);
            }
            if (data) {
                return callback(null, data);
            }

        })
    },

    
};

module.exports = Dev;

