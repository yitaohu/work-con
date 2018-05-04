var Task = require("./task");



// Task.getAllTasks(function(err, res) {
//     if (err) throw err;
//     console.log(res);
// })
var qValue = {"databaseTable":"custom_fluent", 
                  "testListPath": "file://lebqa01.ansys.com/fluentqa/FLUENT/v19.1/rding/convergence_website/new_hybrid/all", 
                   "ThePrecision":"dp",  
                   "Platform": "lnamd64", 
                   "RunType": "short",
                   "Threads": "4", 
                   "ParVersion": "default",   
                   "MPIVersion": "All", 
                   "BuildId": "", 
                   "Tester": "rding", 
                   "beginTime": '2018-04-13 00:37:11', 
                   "endTime": '2018-04-15 14:37:13'
                }; 
Task.getTest(qValue,function(err, res) {
    if (err) throw err;
    // console.log(res);
})


