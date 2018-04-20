var Dev = require('../models/dev');
var FileListProc = require('../models/filelistproc');
var Tools = require('../models/tools')
var Residual = require('../models/residual');

var TestListString = "file:///Users/Yitao/Documents/FrontEnd/Ansys_Work/ansys_myhome_web/mylist";
var run1Path = "file:///Users/Yitao/Documents/FrontEnd/Ansys_Work/ansys_myhome_web/Result2";
var run2Path = "file:///Users/Yitao/Documents/FrontEnd/Ansys_Work/ansys_myhome_web/Result1";

var residualPath = "file://lebqa01.ansys.com/fluentqa/FLUENT/v19.1/rding/convergence_website/new_hybrid/custom2/fluent/axiaft/v19.1.0/axiaft.short.dp.lnamd64-t4.18_04_13_17_19_52/out/axiaft_s1.res.gz";
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
// Tools.getTestDir(null, function (err, data) {
//     if (err) {
//         console.log(err);
//     }
//     if (data) {
//         console.log(data);
//     }
// })

Residual.getResidualData(residualPath, function(err, res) {
    if (err) {
        console.log(err);
    }
    if (res) {
        console.log(res);
    }
})