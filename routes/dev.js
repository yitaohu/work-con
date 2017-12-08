var express = require('express');
var router = express.Router();

// var Dev=require('../models/dev');
var Convergence=require('../models/convergence');
var PathProc=require('../models/path_proc');
var Dev=require('../models/dev');


router.post('/', function(req, res, next) {
    var path = (req.body)[1].run1;
    var testArray = (req.body)[0].Tests;
    Dev.getConvNumArray(testArray, path, function(err, result){
        if (err) {
            res.status(500).json(err);
        }
        res.status(201).json(result);
    })

    // Convergence.getConvNum(path,function(err,data) {
    //     num = data;
    //     console.log(num);
    //     res.status(201);
    // });
})

module.exports = router;


