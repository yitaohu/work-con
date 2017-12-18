var Dev=require('../models/dev');
var FileListProc=require('../models/filelistproc');
var Tools=require('../models/tools')

var TestListString = "file:///Users/Yitao/Documents/FrontEnd/Ansys_Work/ansys_myhome_web/mylist";
var run1Path = "file:///Users/Yitao/Documents/FrontEnd/Ansys_Work/ansys_myhome_web/Result2";
var run2Path = "file:///Users/Yitao/Documents/FrontEnd/Ansys_Work/ansys_myhome_web/Result1";


// Dev.getDiffNumber(TestListString,run1Path,run2Path,function(err,data){
//     if(err) {
//         console.log(err);
//     }
//     if(data) {
//         console.log(data);
//     }
    
// })
// FileListProc.getTestFromFileList(TestListString,function(err,data){
//     console.log(data);
// })
Tools.getTestDir(null,function(err,data){
    if(err) {
        console.log(err);
    }
    if(data){
        console.log(data);
    }
})