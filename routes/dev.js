var express = require('express');
var router = express.Router();

var Dev=require('../models/dev');

router.post('/', function(req, res, next) {
    var path = req.body;
    res.status(200).json(path);
})
module.exports = router;