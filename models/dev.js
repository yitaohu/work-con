var async = require('async');

var Convergence=require('./convergence');
var PathProc=require('../models/path_proc');
var FileListProc=require('../models/filelistproc');


var Dev={
   getConvNumArray:function(TestNameArray, run1Path, callback) {
       path = PathProc.resultPathVerify(run1Path);
       PathProc.getFullTestResultPath(TestNameArray, path, function(err,res) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }    
           var result={}; 
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
                            testname = Object.keys(item)[0] +"||" 
                                        + (Object.keys(element)[0].split('.')[0]).split('_').slice(-2)[0];
                            result[testname] = Object.values(element)[0];
                           });
                           return cb(null, data); 
                       }
                    });
               }, function(err, r){
                    if(err){
                       return callback(err, null);
                    }else{
                     return callback(null, result);
                   }
               })              
           }
          
       });
   },

   getDiffNumArray: function(run1Path, run2Path,TestNameArray,  callback) {
       async.series([
           function(cb) {
            Dev.getConvNumArray(TestNameArray, run1Path, function(err,r1) {

                if (err) {
                    console.log("1st getConvNumArray"+err);
                    return cb(err, null);
                }
                if (r1) {
                    return cb(null, r1);
                }
            });
           },
           function(cb) {
            Dev.getConvNumArray(TestNameArray, run2Path, function(err,r1) {
                if (err) {
                    console.log("2st getConvNumArray"+err);
                    return cb(err, null);
                }
                if (r1) {
                    return cb(null, r1);
                }
            });
           },
           
       ],function(err,diffNum) {
           if (err) {
               console.log("models/dev" + err);
               return callback(err, null);
           }
           resultArray = {};
           for (var key in diffNum[0]) {
               diff= (diffNum[1][key] - diffNum[0][key]) / diffNum[0][key] * 100;//diff
               resultArray[key] = [diffNum[0][key], diffNum[1][key], diff];
            //    console.log(resultArray[key]);
           }
           return callback(null,resultArray);
       })
   },
   
   getDiffNumberFileList: function(TestListString, run1Path, run2Path, callback) {
        async.waterfall([
            function(cb)
            {
              cb(null, TestListString);
            },
            FileListProc.getTestFromFileList,
            async.apply(Dev.getDiffNumArray,run1Path,run2Path)

        ],function(err,data){
            if(err) {
                return callback(err,null);
            }
            if(data) {
                return callback(null,data);
            }

        })
   },


};

module.exports=Dev;

