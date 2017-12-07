var Convergence=require('./convergence');
var PathProc=require('../models/path_proc');


var Dev={
    getConvNumArray:function(TestNameArray, run1Path, callback) {
        
        path = run1Path;

        PathProc.getFullTestResultPath(TestNameArray,path, function(err,res) {
            //res example
            // [ { slab_rad: 'file://lebqa01.ansys.com/users/yihu/yihu/web/Result2/fluent/slab_rad/v19.0.0/slab_rad.short.dp.lnamd64-t4.17_12_06_11_08_51' },   { rep_def_cff: 'file://lebqa01.ansys.com/users/yihu/yihu/web/Result2/fluent/rep_def_cff/v19.0.0/rep_def_cff.short.dp.lnamd64-t4.17_12_06_14_34_19' } ]
        });

        Convergence.getConvNum(path,function(err,data) {

        });// 每一个上面的path 都要调用一遍他 得到后面的数值
        //最后得到 [ { slab_rad: "15"},   { rep_def_cff: "200" } ]

        
        
    }
};
module.exports=Dev;

