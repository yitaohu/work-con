var db=require('../dbconnection');
var mysql=require('mysql');
var Query=require('./query.js');
var Task={
    getAllTasks:function(callback){
        myquery="SELECT Testdir FROM reg_19 WHERE Testname='2cell-stack_pemfc' AND Platform='win64' AND TimeDateStamp between '2017-11-16 16:50:39' and '2017-11-18 16:50:39'";
        return db.query(myquery,callback);
    },
    getTest:function(testname, callback) {
        
        sql = Query.createQuery(testname);
        console.log(sql);
        return db.query(sql,callback);
    }
};
module.exports=Task;