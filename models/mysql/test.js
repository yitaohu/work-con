// var Task = require("./task");



// // Task.getAllTasks(function(err, res) {
// //     if (err) throw err;
// //     console.log(res);
// // })
// var qValue = {"databaseTable":"custom_fluent", 
//                   "testListPath": "file://lebqa01.ansys.com/fluentqa/FLUENT/v19.1/rding/convergence_website/new_hybrid/all", 
//                    "ThePrecision":"dp",  
//                    "Platform": "lnamd64", 
//                    "RunType": "short",
//                    "Threads": "4", 
//                    "ParVersion": "default",   
//                    "MPIVersion": "All", 
//                    "BuildId": "", 
//                    "Tester": "rding", 
//                    "beginTime": '2018-04-13 00:37:11', 
//                    "endTime": '2018-04-15 14:37:13'
//                 }; 
// Task.getTest(qValue,function(err, res) {
//     if (err) throw err;
//     // console.log(res);
// })


// var mysql=require('mysql');
// var pool=mysql.createPool({
//     host    : 'lebpbur410.ansys.com',
//     user    : 'testing',
//     password: 'testing',
//     database: 'Fluent_QA',
// });

// pool.query("SELECT FileName, RunType, ThePrecision, SolverType, ParVersion, Platform, Tester FROM DailyTestSchedule WHERE ProjectName='Daily_Reg_dev' ", function(err, rows) {
//     console.log(rows);
//     // connection.releaseConnection();
// })





// var myQuery = "SELECT FileName, RunType , ThePrecision, SolverType, ParVersion, Platform, Tester, Threads, PostThreads FROM ?? WHERE ProjectName=? AND Threads IN (?) ORDER BY FileName ASC";
// sqlQuery = mysql.format(myQuery,["DailyTestSchedule", "Daily_Reg_dev",[0] ]);
// console.log(sqlQuery);
// pool.query(sqlQuery, function(err, rows) {
//     console.log(rows);
//     console.log(sqlQuery);
    
//     // connection.releaseConnection();
// })

var Assignment = require('../regMonitor/assignment')

var filter = {
    "projectName":"Daily_Reg_dev",
    "runType":"short",
    "thePrecision":"dp",
    "platform":"win64",
    "threads":"2",
    "tester":"yihu"
}
Assignment.getAssign(filter,function(err, data){
    console.log(data);
})
// pool.getConnection(function(err, connection) {
//     connection.query("SELECT FileName, RunType, ThePrecision, SolverType, ParVersion, Platform, Tester FROM DailyTestSchedule WHERE ProjectName='Daily_Reg_dev' ", function(err, rows) {
//         console.log(rows);
//         // connection.releaseConnection();
//     });
//     connection.release();
// })
