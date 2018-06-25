var async = require('async');
var fs = require("fs");
const { URL } = require("url");

var Convergence = require('./convergence');
var PathProc = require('../models/path_proc');
var FileListProc = require('../models/filelistproc');


var ConvNumArray = {
    getConvNumArray: function (TestNameArray, run1Path, filter, callback) {
        path = PathProc.resultPathVerify(run1Path);
        PathProc.getFullTestResultPath(TestNameArray, path, filter, function (err, res) {
            if (err) {
                console.log("dev.getConvNumArray" + err);
                return callback(err, null);
            }
            var result = {};
            if (res && Array.isArray(res)) {
                // console.log("++++++ConvNumArray getConvNumArray ++++++");
                // console.log(res);
                async.mapSeries(res, function (item, cb) {
                    if (item && Object.values(item)[0]) {
                        fullpath = Object.values(item)[0];
                        if (fs.existsSync(new URL(fullpath + "/out"))) {
                            fullpath += "/out";
                        }
                        console.log("++++++convNumArray++++++++++")
                        console.log(fullpath);
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

                                    result[testname] = [Object.values(element)[0], fullpath];
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
    }
}
module.exports = ConvNumArray;