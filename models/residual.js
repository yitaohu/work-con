var fs = require('fs');
const { URL } = require('url');
var zlib = require("zlib");
const readline = require('readline');

var Residual = {
    // getResidualData: function (residualFilePath, callback) {
    //     var residualFilePathURL = new URL(residualFilePath);

    //     if (!residualFilePath) {
    //         return callback(null, null);
    //     }
    //     fs.readFile(residualFilePathURL, function (err, data) {
    //         if (err) {
    //             return callback(err, null);
    //         }
    //         console.log(data);
    //         zlib.gunzip(data, function (err, num) {
    //             if (err) {
    //                 return callback(err, null);
    //             }
    //             return callback(null, num.toString())
    //         })
    //     })
    // },
    getResidualData: function (residualFilePath, callback) {
        var residualFilePathURL = new URL(residualFilePath);

        var gunzip = zlib.createGunzip();
        var rstream = fs.createReadStream(residualFilePathURL);

        var labelName = [];
        var iterationNum = [];
        var resData = [[]];
    
        var residualResult = {};

        var current = 0;
        
        const rl = readline.createInterface({
            input: rstream.pipe(gunzip),
            crlfDelay: Infinity
        });
        
        rl.on('line', (line) => {
            if(line.length != 0 && !line.match(/^\)/)) {
                if(line.indexOf("label") != -1) {
                    start = line.indexOf("\"");
                    end = line.lastIndexOf("\"");
                    labelName.push(line.slice(start + 1, end));
                } else {
                    if (current == 0) {
                        iterationNum.push(line.split("\t")[0]);
                    }else {
                        resData[current].push(line.split("\t")[1])
                    }
                }
            } else if(line.match(/^\)/)) {
                current++;
                resData.push([]);
            }
        });
        rl.on('close', () => {
            residualResult = {
                "label" : labelName,
                "interation" : iterationNum,
                "resData" : resData
            }
            return callback(null, residualResult);
        });
    }

}





module.exports = Residual;