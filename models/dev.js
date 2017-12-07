var async = require('async');

var Convergence=require('./convergence');
var PathProc=require('../models/path_proc');


var Dev={
   getConvNumArray:function(TestNameArray, run1Path, callback) {
       
       path = run1Path;

       PathProc.getFullTestResultPath(TestNameArray, path, function(err,res) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }    
           var result = []; 
           if(res && Array.isArray(res)){
               async.mapSeries(res, function(item, cb){
                   fullpath = Object.values(item)[0];
                    Convergence.getConvNum(fullpath,function(err,data) {
                       if(err){
                           console.log(err);
                           return cb(err, null);
                       }
                       if(data){
                           data.forEach(function(element){
                            testname = Object.keys(item)[0] +"----" + Object.keys(element)[0];
                            result.push({[testname]: Object.values(element)[0]});
                           });
                           return cb(null, data); 
                       }


                    });
               }, function(err, r){
                    if(err){
                        console.log(err);
                       return callback(err, null);
                    }else{
                    // here you will get the result finally.
                     return callback(null, result);
                   }
               })              
           }
          
       });

       
   }
};

module.exports=Dev;

