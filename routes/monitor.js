var express = require('express');
var router = express.Router();


var DataQuery = require('../models/mysql/dataQuery');
var Tools = require('../models/tools');
var DataResult = require('../models/regMonitor/dataResult');




router.get('/', function (req, res, next) {
    // console.log(req.query);
    var version = req.query.version;
    var testListPath = decodeURIComponent(req.query.testListPath);
    var days = req.query.days;
    var projectType = req.query.projectType;
    var databaseTable = req.query.databaseTable;
    var precision = req.query.precision;
    var runType = req.query.runType.split(',');
    var thread = req.query.thread.split(',');
    var platform = req.query.platform;
    var buildId = req.query.buildId;
    var testEngineer = req.query.testEngineer;
    var resultsDir = decodeURIComponent(req.query.resultsDir);
    
    testListPath = Tools.addFileToPath(testListPath);
    resultsDir = Tools.addFileToPath(resultsDir);

    ///to-do temp result Dir

    var qValue = {
        "databaseTable": databaseTable,
        "testListPath": testListPath,
        "thePrecision": precision,
        "platform": platform,
        "runType": runType,
        "threads": thread,
        "buildId": buildId,
        "tester": testEngineer,
        "version": version,
        "resultsDir": resultsDir,
        "days": days,
        "projectType": projectType
    };

    console.log(qValue);

    DataResult.getResult(qValue,function(err, rows) {
        if (err) {
            console.log(err);
            res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        else {
            console.log(Array.isArray(rows));
            res.status(201).json(rows);
        }
    })
    

})


module.exports = router;