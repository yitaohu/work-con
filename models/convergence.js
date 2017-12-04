const { URL } = require('url');
var fs = require('fs');
var zlib=require('zlib');

var Convergence = {
    getConvNum: function(path) {
        var myPath = new URL(path);
        fs.readFile(myPath, function(err,data){
            if (err) {
                return console.log(err);
              }
              zlib.gunzip(data, function(err, num){
                  if (err) {
                      return console.log(err);
                  }
                return num.toString('utf8');
              })
        });
    }
}
module.exports=Convergence;