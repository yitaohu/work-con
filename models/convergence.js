const { URL } = require('url');
var fs = require('fs');
var zlib=require('zlib');

var Convergence = {
    getConvNum: function(path, callback) {
        var myPath = new URL(path);
        fs.readFile(myPath, function(err,data){
            if (err) {
                return callback(err,null);
              }
              zlib.gunzip(data, function(err, num){
                  if (err) {
                    return callback(err,null);
                  }
                console.log("convergence"+num.toString('utf8'));
                return callback(null, num.toString('utf8'))
              })
        });
    }
}
module.exports=Convergence;