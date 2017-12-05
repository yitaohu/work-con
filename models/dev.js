var Convergence=require('./convergence');

var Dev={
    getConvNum:function(path) {
        
        var convNum = Convergence.getConvNum(path,function(err,data) {

        });
        return convNum;
    }
};
module.exports=Dev;

