var db=require('../dbconnection');
var mysql=require('mysql');
var Convergence=require('./convergence.js');

var Dev={
    getConvNum:function(path) {
        
        var convNum = Convergence.getConvNum(path);
        return convNum;
    }
};
module.exports=Dev;

