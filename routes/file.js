var express = require('express');
var router = express.Router();

var Task=require('../models/task');

 


router.get('/', function(req, res, next) {
    console.log(req.query);
    var testname = req.query.TestName;
    console.log("second function works");
    console.log(testname);
    Task.getTest(testname, function(err, rows){
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