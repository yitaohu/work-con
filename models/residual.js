var fs = require('fs');
const {URL} = require('url');
var zlib = require("zlib");


var Residual = {
    getResidualData: function(residualFilePath, callback) {
        var residualFilePathURL = new URL(residualFilePath);

        if(!residualFilePath) {
            return callback(null,null);
        }
        if(!fs.existsSync(residualFilePath)) {
            console.log(residualFilePath);
            return callback(null,null);
        }
        fs.readFile(residualFilePathURL,function (err, data) {
            if (err) {
                return callback(err, null);
            }
            console.log(data);
            zlib.gunzip(data, function (err, num) {
                if (err) {
                    return callback(err,null);
                }
                return callback(null, num)
            })
        }) 
    }

}





module.exports = Residual;