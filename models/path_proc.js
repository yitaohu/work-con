var Tools = require('./tools');



PathProc = {
    getFullTestResultPath: function (test_names, curr_path, filter, callback) {
        var myTestPathPairArray = [];
        myPathArray = Tools.getPathArray(test_names, curr_path, filter['version']);
        myPathArray.forEach(function (Element) {
            Tools.getTestDir(Object.values(Element)[0],filter, function (err, res) {
                if (err) {
                    console.log("path_proc.getFullTestResultPath" + err);
                    return callback(err, null);
                }
                if (res) {
                    testNameKey = Object.keys(Element)[0];
                    fullPath = Object.values(Element)[0].href + "/" + res;
                    myTestPathPairArray.push({ [testNameKey]: fullPath });
                } else {
                    myTestPathPairArray.push({ [Object.keys(Element)[0]]: null });
                }

                if (myTestPathPairArray.length === myPathArray.length) {
                    return callback(null, myTestPathPairArray);
                }
            })

        });
    },

    resultPathVerify: function (path) {
        if (path[path.length - 1] != '/') {
            path = path + "/";
        }
        return path;
    }
}

module.exports = PathProc;