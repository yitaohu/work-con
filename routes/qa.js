var express = require('express');
var router = express.Router();

var Task=require('../models/task');

 


router.get('/', function(req, res, next) {
    console.log(req.query);
    var testname = req.query.TestName;
    var begintime = req.query.BeginTime;
    var endtime = req.query.EndTime;
    var qValue = [testname, begintime, endtime];
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