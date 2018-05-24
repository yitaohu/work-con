var fs = require('fs');
const { URL } = require('url');



FileListProc = {
    getTestFromFileList: function (fileListPath, callback) {
        // console.log(fileListPath);
        var filelistPathURL = new URL(fileListPath);
        fs.readFile(filelistPathURL, 'utf8', function (err, data) {
            if (err) {
                return callback(new Error('Please check the List File Path.'), null);
            }
            if (data) {
                var myTestsArray ;
                fileString=data.replace(/\n|\s/g, ',');
                    if (fileString.slice(-1)==',') {
                        myTestsArray = fileString.slice(0,-1).split(",")
                    } else {
                        myTestsArray = fileString.split(",")
                    }


                if (myTestsArray.length == 0) {
                    return callback(new Error("List File donesn't have any tests! Please check the List File Path."), null);
                }
                return callback(null, myTestsArray);
            }
        })
    }
}
module.exports = FileListProc;