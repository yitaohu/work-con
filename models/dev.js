var Convergence=require('./convergence');
var PathProc=require('../models/path_proc');


var Dev={
    getConvNumArray:function(TestNameArray, run1Path, callback) {
        
        path = run1Path;

        PathProc.getFullTestResultPath(TestNameArray,path, function(err,res) {
            console.log(res);
        });

        var convNum = Convergence.getConvNum(path,function(err,data) {

        });
        return convNum;
    }
};
module.exports=Dev;

