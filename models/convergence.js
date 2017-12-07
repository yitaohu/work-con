const { URL } = require('url');
var fs = require('fs');
var zlib=require('zlib');
var async=require('async');

var Convergence = {
    getConvNum: function(path, callback) {
        var myPath = new URL(path);

        fs.readdir(myPath, function(err, pathArray){
            if (err) {
                console.log(err);
            }
            convNumArray = []
            if(pathArray && Array.isArray(pathArray)){
                async.mapSeries(pathArray, function(item, cb) {
                    if (!item.includes(".conv.gz") || item.includes("_no_std.conv.gz")) {
                        return cb(null, null);
                    } else {
                        var pathItem= path + "/" + item;
                        pathItemUrl = new URL(pathItem);
                        fs.readFile(pathItemUrl, function(err,data){
                            if (err) {
                                return cb(err,null);
                              }
                              zlib.gunzip(data, function(err, num){
                                  if (err) {
                                    return cb(err,null);
                                  }
                                convNumString=parseInt(num.toString('utf8'));
                                convNumArray.push({[item]:convNumString});
                                return cb(null, convNumString);
                              })
                        });
                    }
                }, function(err,result){
                    if(err) {
                        return callback(err,null);
                    } else {
                        console.log(convNumArray);
                        return callback(null, convNumArray);
                    }
                })
            };
        })

        
    }
}
module.exports=Convergence;