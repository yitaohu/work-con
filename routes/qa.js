var express = require('express');
var router = express.Router();


var DataQuery = require('../models/mysql/dataQuery');
var Tools = require('../models/tools');
var ConvDiff_DB = require('../models/mysql/convDiff_DB');




router.get('/', function (req, res, next) {
    console.log(req.query);
    var testListPath = decodeURIComponent(req.query.testListPath);
    testListPath = Tools.addFileToPath(testListPath);
    var runType = req.query.runType;
    var thread = req.query.thread;
    var platform = req.query.platform;
    var buildId = req.query.buildId;
    var testEngineer = req.query.testEngineer;
    var days = req.query.days;
    var resultsDir = decodeURIComponent(req.query.resultsDir);
    var customBuildPath = decodeURIComponent(req.query.customBuildPath);
    var version = req.query.version ;

    ///to-do temp result Dir

    var today = new Date();
    var yesterday = new Date(today.getTime());
    yesterday.setDate(today.getDate() - days);

    var qValue = {
        "testListPath": testListPath,
        "Platform": platform,
        "RunType": runType,
        "Threads": thread,
        "BuildId": buildId,
        "Tester": testEngineer,
        "beginTime": yesterday,
        "endTime": today,
        "Version": version,
        "resultsDir": "file://lebqa01.ansys.com/export/testing/matrix/RESULTS/fluent/"
    };
    var customFilter = {
        'version': version.slice(0,4),
        'runMode': runType,
        'thread': "t" + thread
    }
   
    console.time("dbsave");
    customBuildPath = Tools.addFileToPath(customBuildPath);

    // FileListProc.getTestFromFileList(qValue.testListPath,function(err,res){
    //     console.log(res);
    //     console.timeEnd("dbsave");
    // })


    
    // DataQuery.queryData(qValue, function (err, rows) {
    //     if (err) {
    //         console.log(err)
    //         res.json(err);
    //     }
    //     else {
    //         console.log(rows)
    //         res.json(rows);
    //         console.timeEnd("dbsave");
    //     }
    // })

    ConvDiff_DB.getDiffNumArray(qValue,customBuildPath, customFilter, function(err, rows) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                title: 'An error occurred',
                error: err.message
            });
        }
        else {
            // console.log(rows)
            res.status(201).json(rows);
            console.timeEnd("dbsave");
        }
    })
    

})


module.exports = router;