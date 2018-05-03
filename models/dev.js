var async = require('async');
var fs = require("fs");
const { URL } = require("url");

var Convergence = require('./convergence');
var PathProc = require('../models/path_proc');
var FileListProc = require('../models/filelistproc');


var Dev = {
    getConvNumArray: function (TestNameArray, run1Path, filter, callback) {
        path = PathProc.resultPathVerify(run1Path);
        PathProc.getFullTestResultPath(TestNameArray, path, filter, function (err, res) {
            if (err) {
                console.log("dev.getConvNumArray" + err);
                return callback(err, null);
            }
            var result = {};
            if (res && Array.isArray(res)) {
                async.mapSeries(res, function (item, cb) {
                    if (item && Object.values(item)[0]) {
                        fullpath = Object.values(item)[0];
                        if (fs.existsSync(new URL(fullpath + "/out"))) {
                            fullpath += "/out";
                        } 
                        Convergence.getConvNum(fullpath, function (err, data) {
                            if (err) {
                                console.log("dev.getConvNumArray" + err);
                                return cb(err, null);
                            }
                            if (data) {
                                data.forEach(function (element) {
                                    convFileName = Object.keys(element)[0];

                                    testname = Object.keys(item)[0] + "||"
                                        + convFileName.slice(0, convFileName.length - 11);

                                    result[testname] = [Object.values(element)[0],fullpath];
                                });
                                return cb(null, data);
                            }
                        });
                    } else {
                        return cb(null, data);
                    }

                }, function (err, r) {
                    if (err) {
                        console.log("dev.getConvNumArray" + err);
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                })
            }

        });
    },

    getDiffNumArray: function (run1Path, run2Path, filter, TestNameArray, callback) {
        async.series([
            function (cb) {
                Dev.getConvNumArray(TestNameArray, run1Path, filter, function (err, r1) {
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
                Dev.getConvNumArray(TestNameArray, run2Path, filter, function (err, r1) {
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

