// // var Task = require("./task");



// // // Task.getAllTasks(function(err, res) {
// // //     if (err) throw err;
// // //     console.log(res);
// // // })
// // var qValue = {"databaseTable":"custom_fluent", 
// //                   "testListPath": "file://lebqa01.ansys.com/fluentqa/FLUENT/v19.1/rding/convergence_website/new_hybrid/all", 
// //                    "ThePrecision":"dp",  
// //                    "Platform": "lnamd64", 
// //                    "RunType": "short",
// //                    "Threads": "4", 
// //                    "ParVersion": "default",   
// //                    "MPIVersion": "All", 
// //                    "BuildId": "", 
// //                    "Tester": "rding", 
// //                    "beginTime": '2018-04-13 00:37:11', 
// //                    "endTime": '2018-04-15 14:37:13'
// //                 }; 
// // Task.getTest(qValue,function(err, res) {
// //     if (err) throw err;
// //     // console.log(res);
// // })


// var mysql=require('mysql');
// var pool=mysql.createPool({
//     host    : 'lebpbur410.ansys.com',
//     user    : 'testing',
//     password: 'testing',
//     database: 'Fluent_QA',
// });

// // pool.query("SELECT FileName, RunType, ThePrecision, SolverType, ParVersion, Platform, Tester FROM DailyTestSchedule WHERE ProjectName='Daily_Reg_dev' ", function(err, rows) {
// //     console.log(rows);
// //     // connection.releaseConnection();
// // })




// today = new Date();
// var yesterday = new Date(today.getTime());
// yesterday.setDate(today.getDate() - 4);

// // var myQuery = "SELECT FileName, RunType , ThePrecision, SolverType, ParVersion, Platform, Tester, Threads, PostThreads FROM ?? WHERE ProjectName=? AND Threads IN (?) ORDER BY FileName ASC";
// // sqlQuery = mysql.format(myQuery,["DailyTestSchedule", null,[0] ]);
// // console.log(sqlQuery);
// // pool.query(sqlQuery, function(err, rows) {
// //     console.log(rows);
// //     console.log(sqlQuery);
    
// //     // connection.releaseConnection();
// // })
// testArray = ["node-based-reconstruct",
//     "nozzle_3d",
//     "nrbc_slid_pulse_audf",
//     "obl-shock_ramp",
//     "p-m_expansion",
//     "r2822",
//     "r2822_exp-relax",
//     "scram",
//     "shock_tube",
//     "shock_tube_fix_ts",
//     "sqjet",
//     "UDS_DBNS_Explicit_Transient",
//     "sol_strategy_2d",
//     "dbns_transient_species_ini",
//     "skewed_alt_formulation",
//     "multiphase_ini_phase"]
            
    
// insert = [
//     "reg_dev",//0-
//     testArray,//1-
//     "win64",//2
//     "dp",//3
//     1,//4
//     "short",//5
//     "flutest:yihu",//6-
//     "19.2.0",//7
//     "default",//8
//     "default",//9
//     1,//10
//     yesterday,
//     today
// ]
// var myQuery = "SELECT Testname, Result, Testdir \
//                 FROM ?? \
//                 WHERE Testname IN (?) AND Platform = ? AND ThePrecision = ? AND Threads = ? AND RunType = ? \
//                 AND Tester = ? AND Version = ? AND ParVersion = ? AND MPIVersion = ? AND PostThreads = ? \
//                 AND TimeDateStamp BETWEEN ? AND ?\
//                 ORDER BY Testname ASC";
// sqlQuery = mysql.format(myQuery,insert);
// console.log(sqlQuery);
// // Q = "SELECT * FROM reg_dev WHERE Testname = 'node-based-reconstruct' AND Platform = 'win64' AND ThePrecision = 'dp' AND Threads = 1 AND RunType = 'short' AND Tester = 'flutest:yihu' AND Version = '19.2.0' AND PostThreads = 1 AND TimeDateStamp between '2018-05-06 11:58:34.078' AND '2018-05-10 11:58:34.078' ORDER BY Testname DESC";
// pool.query(sqlQuery, function(err, rows) {
//     console.log(rows);
//     console.log(sqlQuery);
    
//     // connection.releaseConnection();
// })
// var Assignment = require('../regMonitor/assignment')

var filter = {
    "projectName":"Daily_Reg_dev",
    "runType":"short",
    "thePrecision":"dp",
    "platform":"lnamd64",
    "threads":[1],
    "tester":"yihu",
    "version":"19.2.0",
    "day":45,
    "databaseTable":"reg_dev",

}
// Assignment.getAssign(filter,function(err, data){
//     console.log(data);
// })


// pool.getConnection(function(err, connection) {
//     connection.query("SELECT FileName, RunType, ThePrecision, SolverType, ParVersion, Platform, Tester FROM DailyTestSchedule WHERE ProjectName='Daily_Reg_dev' ", function(err, rows) {
//         console.log(rows);
//         // connection.releaseConnection();
//     });
//     connection.release();
// })

var Assignment = require('../regMonitor/assignment');

Assignment.getAssign(filter, function(err, data){
    Assignment.queryCreate(data,filter, function(err, res){
        // console.log(res);
    })
})