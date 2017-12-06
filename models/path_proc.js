var Tools=require('./tools');

curr_path = "file://lebqa01.ansys.com/users/yihu/yihu/web/Result2";
test_names=["slab_rad","rep_def_cff"];

var myPathArray = Tools.getPathArray(test_names,curr_path);
myPathArray.forEach(function(Element){
    Tools.getTestDir(Element,function(err, res){
        if (err) {
            console.log(err);
        }
        console.log(res);
    })
});

