var express = require('express');
var router = express.Router();

var Task=require('../models/task');

 


router.get('/', function(req, res, next) {
    console.log(req.query);
    var testListPath = decodeURI(req.query.testListPath);
    var beginTime = req.query.beginTime;
    var endTime = req.query.endTime;
    var precision = req.query.precision;
    var runType = req.query.runType;
    var thread = req.query.thread;
    var interconnect = req.query.interconnect;
    var mpi = req.query.mpi;
    var platform = req.query.platform;
    var buildId = req.query.buildId;
    var testEngineer = req.query.testEngineer;
    // var solverBin = req.query.solverBin;
    var databaseTable = req.query.databaseTable;




    var qValue = [databaseTable, testListPath, precision,  
                    platform, runType,thread, interconnect,   
                    mpi, buildId, testEngineer, 
                    beginTime, endTime];
    console.log(testname);
    Task.getTest(qValue, function(err, rows){
        if(err)
        {
        res.json(err);
        }
        else
        {
        res.json(rows);
        }
    })
})
router.get('/',function(req,res,next){
    Task.getAllTasks(function(err,rows){
        if(err)
        {
        res.json(err);
        }
        else
        {
        res.json(rows);
        }
    });
});

module.exports = router;