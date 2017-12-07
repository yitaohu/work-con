var express = require('express');
var router = express.Router();

// var Dev=require('../models/dev');
var Convergence=require('../models/convergence');
var PathProc=require('../models/path_proc');


router.post('/', function(req, res, next) {
    var path = (req.body)[1].run1;
    var testArray = (req.body)[0].Tests;
    console.log(path);
    console.log(testArray);
    PathProc.getFullTestResultPath(testArray,path, function(err,res) {
        console.log(res);
    });


    // Convergence.getConvNum(path,function(err,data) {
    //     num = data;
    //     console.log(num);
    //     res.status(201);
    // });
})

module.exports = router;


