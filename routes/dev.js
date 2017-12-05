

var express = require('express');
var router = express.Router();

// var Dev=require('../models/dev');
var Convergence=require('../models/convergence');

router.post('/', function(req, res, next) {
    var path = req.body.run1;
    console.log(path);
    var num = Convergence.getConvNum(new String(path));
    console.log(num);
    res.status(201);
})
module.exports = router;