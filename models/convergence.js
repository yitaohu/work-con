const { URL } = require("url");
var fs = require("fs");
var zlib = require("zlib");
var async = require("async");

var Convergence = {
    getConvNum: function (path, callback) {
        var myPath = new URL(path);

        fs.readdir(myPath, function (err, pathArray) {
            if (err) {
                console.log("convergence.getConvNum" + err);
            }
            convNumArray = [];
            if (pathArray && Array.isArray(pathArray)) {
                async.mapSeries(
                    pathArray,
                    function (item, cb) {
                        if (
                            !item ||
                            !item.includes(".conv.gz") ||
                            item.includes("_no_std.conv.gz")
                        ) {
                            return cb(null, null);
                        } else {
                            var pathItem = path + "/" + item;
                            pathItemUrl = new URL(pathItem);
                            fs.readFile(pathItemUrl, function (err, data) {
                                if (err) {
                                    console.log("convergence.getConvNum" + err);
                                    return cb(err, null);
                                }
                                zlib.gunzip(data, function (err, num) {
                                    if (err) {
                                        console.log("convergence.getConvNum" + err);
                                        return cb(err, null);
                                    }
                                    convNumString = parseInt(num.toString("utf8"));
                                    convNumArray.push({ [item]: convNumString });
                                    return cb(null, convNumString);
                                });
                            });
                        }
                    },
                    function (err, result) {
                        if (err) {
                            console.log("convergence.getConvNum" + err);
                            return callback(err, null);
                        } else {
                            return callback(null, convNumArray);
                        }
                    }
                );
            }
        });
    }
};
module.exports = Convergence;
