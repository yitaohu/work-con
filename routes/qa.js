var express = require('express');
var router = express.Router();

var Task=require('../models/mysql/task');

 


router.get('/', function(req, res, next) {
    console.log(req.query);
    var testListPath = decodeURIComponent(req.query.testListPath);
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
    var databaseTable = req.query.databaseTable;

    var resultsDir = decodeURIComponent(req.query.resultsDir);

    ///to-do temp result Dir

    resultsDir = ""




    var qValue = {"databaseTable":databaseTable, 
                  "testListPath": testListPath, 
                   "ThePrecision":precision,  
                   "Platform": platform, 
                   "RunType": runType,
                   "Threads": thread, 
                   "ParVersion": interconnect,   
                   "MPIVersion": mpi, 
                   "BuildId": buildId, 
                   "Tester": testEngineer, 
                   "beginTime": beginTime, 
                   "endTime": endTime
                };

    Task.getTest(qValue, function(err, rows){
        if(err)
        {
            console.log(err)
            res.json(err);
        }
        else
        {
            console.log(rows)
            res.json(rows);
        }
    })
})
// router.get('/',function(req,res,next){
//     Task.getAllTasks(function(err,rows){
//         if(err)
//         {
//         res.json(err);
//         }
//         else
//         {
//         res.json(rows);
//         }
//     });
// });

module.exports = router;