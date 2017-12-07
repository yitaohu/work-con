var Tools=require('./tools');



PathProc = {
    getFullTestResultPath: function (test_names,curr_path,callback) {
        var myTestPathPairArray = [];
        myPathArray = Tools.getPathArray(test_names,curr_path);
        myPathArray.forEach(function(Element){
            Tools.getTestDir(Object.values(Element)[0],function(err, res){
                if (err) {
                    return callback(err,null);
                }
                testNameKey=Object.keys(Element)[0];
                fullPath=Object.values(Element)[0].href +"/"+ res;
                myTestPathPairArray.push({[testNameKey]: fullPath});
                if (myTestPathPairArray.length === myPathArray.length) {
                    return callback(null,myTestPathPairArray);
                }
            })
        
        });
    }
}

module.exports=PathProc;