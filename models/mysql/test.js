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
var fs = require('fs');
var filter = {
    "projectName":"Offsite",
    "runType":["short","quick"],
    "thePrecision":["dp","sp"],
    "platform":["lnamd64"],
    "threads":[16],
    "tester":"rding",
    "version":"19.2.0",
    "day":3,
    "databaseTable":"offsite_fluent",

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
function assemble(modeObject) {
    res = modeObject.Platform+" in "+modeObject.SolverType+" "+
    modeObject.RunType+" for "+modeObject.ThePrecision+" and postthread "+modeObject.Threads+" and threads "+modeObject.PostThreads+" parallel interconnect "
    +modeObject.ParVersion+" and mpi "+modeObject.MPIVersion;
    return res;

}
var Assignment = require('../regMonitor/assignment');

Assignment.getAssign(filter, function(err, data){
    Assignment.queryCreate(data,filter, function(err, res){
        // console.log(res)
        scriptstring = [];
        for(let item in res) {
            // console.log(item);
            for(let testname in res[item]) {
                // console.log("**************")
                // console.log(testname);
                // console.log(res[item][testname])
                if (res[item][testname].length>0) {
                    // console.log(res[item][testname]);
                    for(let i = 0; i < res[item][testname].length; i++) {
                        // console.log(res[item][testname][i])
                        data[item];

                        Platform = res[item][testname][i].Platform;
                        
                        RunType = res[item][testname][i].RunType;
                        if(res[item][testname][i].ThePrecision == "dp"){
                            ThePrecision = "double";
                        }else {
                            ThePrecision=""
                        }
                        Threads = "-t" + res[item][testname][i].Threads;
                        PostThreads = "-postt"+res[item][testname][i].PostThreads;
                        if(res[item][testname][i].ParVersion == "-" || res[item][testname][i].ParVersion == "default") {
                            ParVersion = ""
                        } else {
                            ParVersion = "-p=" + res[item][testname][i].ParVersion;
                        }
                        if(res[item][testname][i].MPIVersion == "-" || res[item][testname][i].MPIVersion == "default") {
                            MPIVersion = ""
                        } else {
                            MPIVersion = "-mpi=" +res[item][testname][i].MPIVersion;
                        }
                        
                        string = "perl $ENV{'PERL5LIB'}/auto_fluent.pl " + RunType + " " + ThePrecision + " " + Threads + " " + PostThreads + " " + ParVersion + " " 
                            + MPIVersion + " fluent v19.2.0 " +testname;
                        scriptstring.push(string);
                        
                    }
                }
                
            }
        }
        
        fs.writeFile('rongtest.txt', scriptstring.join("\n"), function (err) {
            if (err) throw err;
            console.log('Saved!');
          });
    
    })
})

// "RunType":"short","ThePrecision":"dp","SolverType":"parallel","Platform":"lnamd64","Threads":2,"PostThreads":2,"ParVersion":"default","MPIVersion":"default"

// system("perl $ENV{'PERL5LIB'}/auto_fluent.pl short double -t1 fluent  v19.2.0 cyl_2d-nita	");
// "lbm1":{"lbm_cavity_driven":[
//     {"RunType":"short","ThePrecision":"dp","SolverType":"parallel","Platform":"lnamd64","Threads":4,"PostThreads":4,"ParVersion":"default","MPIVersion":"default"},
//     {"RunType":"short","ThePrecision":"dp","SolverType":"parallel","Platform":"lnamd64","Threads":2,"PostThreads":2,"ParVersion":"default","MPIVersion":"default"},
//     {"RunType":"short","ThePrecision":"dp","SolverType":"parallel","Platform":"lnamd64","Threads":1,"PostThreads":1,"ParVersion":"default","MPIVersion":"default"}]},