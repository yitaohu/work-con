var express = require('express');
var router = express.Router();


var Convergence=require('../models/convergence');
var PathProc=require('../models/path_proc');
var Dev=require('../models/dev');
var Tools=require('../models/tools');


router.post('/', function(req, res, next) {
    var path1 = (req.body)[1].run1;
    var path2 = (req.body)[2].run2;
    var testArray = (req.body)[0].Tests;
    var version = (req.body)[3].version;
    var runMode = (req.body)[4].runMode; //TO-DO
    var thread = (req.body)[5].thread;
    
    testArray = Tools.addFileToPath(testArray);
    path1 = Tools.addFileToPath(path1);
    path2 = Tools.addFileToPath(path2);

    filter = {
        'version' : version,
        'runMode' : runMode,
        'thread'  : thread
    }

    Dev.getDiffNumberFileList(testArray, path1, path2, filter, function(err,diff){
        if (err) {
            console.log("dev router "+err);
            res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        } else {
            res.status(201).json(diff); 
        }
               
    })
})

module.exports = router;


