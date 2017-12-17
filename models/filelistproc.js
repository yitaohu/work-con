var fs = require('fs');
const { URL } = require('url');



FileListProc = {
    getTestFromFileList:function(fileListPath,callback) {
        console.log(fileListPath);
        var filelistPath = new URL(fileListPath);
        fs.readFile(filelistPath,'utf8',function(err,data){
            if (err) {
                return callback(err,null)
            }
            if (data) {
                var myTestsArray = data.replace(/\n|\s/g,',').split(",")
                return callback(null,myTestsArray)
            }
        })
    }
}
module.exports = FileListProc;