var express = require('express');
var router = express.Router();


var Convergence=require('../models/convergence');
var PathProc=require('../models/path_proc');
var Dev=require('../models/dev');


router.post('/', function(req, res, next) {
    var path1 = (req.body)[1].run1;
    var path2 = (req.body)[2].run2;
    var testArray = (req.body)[0].Tests;
    var version = (req.body)[3].version;
    var runMode = (req.body)[4].runMode //TO-DO

    
    // Dev.getDiffNumArray(testArray,path1,path2,function(err,diff){
    //     // console.log(diff);
    // // })
    // // Dev.getConvNumArray(testArray, path, function(err, result){
    //     if (err) {
    //         res.status(500).json(err);
    //     }
    //     // console.log(result);
    //     res.status(201).json(diff);
    // })
    filter = {
        'version' : version,
        'runMode' : runMode
    }
    console.log(filter['version']);

    Dev.getDiffNumberFileList(testArray, path1, path2, filter, function(err,diff){
        if (err) {
            console.log(err);
            res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        // console.log(result);
        res.status(201).json(diff);        
    })

    // Convergence.getConvNum(path,function(err,data) {
    //     num = data;
    //     console.log(num);
    //     res.status(201);
    // });
})

module.exports = router;


