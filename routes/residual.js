var express = require('express');
var router = express.Router();
var async = require('async');

var Residual=require('../models/residual');

router.post('/', function(req, res, next){
    var testName = (req.body)[0].testName;
    var journalName = (req.body)[1].journalName;
    var outDir1 = (req.body)[2].outDir1;
    var outDir2 = (req.body)[3].outDir2;

    var path1 = outDir1 + "/" + journalName + ".res.gz";
    var path2 = outDir2 + "/" + journalName + ".res.gz";

    async.parallel({
        One : function(callback) {
            Residual.getResidualData(path1, callback);
        },
        Two : function(callback) {
            Residual.getResidualData(path2, callback);
        }
        
    }, function(err, results) {
        if (err) {
            console.log(err);
            res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json(results);
    })
}) 


module.exports = router;
