var fs = require('fs');
const { URL } = require('url');
var mysql = require('mysql');
var db = require('../mysql/dbconnection');
var FileListProc = require('../filelistproc')

var Assignment = {
    getAssign: function(filter, callback) {
        var databaseTable= "DailyTestSchedule";
        var listFilePath= "file://lebqa01.ansys.com/export/testing/matrix/fbutests/fluent/develop/lists";
        var projectName = filter.projectName;
        var runType = filter.runType;
        var thePrecision = filter.thePrecision;
        var platform = filter.platform;
        var threads = filter.threads;
        var tester = filter.tester;
        var myQuery = "SELECT FileName, RunType, ThePrecision, SolverType, ParVersion, Platform, Tester, Threads, PostThreads, MPIVersion \
                        FROM ?? \
                        WHERE ProjectName=? AND RunType IN (?) AND ThePrecision IN (?) AND Platform IN (?) AND Threads IN (?) AND Tester IN (?) \
                        ORDER BY FileName DESC";

        sqlQuery = mysql.format(myQuery,[databaseTable, projectName, runType, thePrecision, platform, threads, tester]);
        listObject = {};
        db.query(sqlQuery, function(err, data){
            
            for(let i = 0; i < data.length; i++) {
                if(!listObject[data[i].FileName]) {
                    listObject[data[i].FileName] = {};

                    filePath = new URL(listFilePath +"/" +data[i].FileName);
                    console.log("++++filepath");
                    console.log(filePath);
                    listObject[data[i].FileName]["testArray"] = fs.readFileSync(filePath, 'utf8').replace(/\n|\s/g, ',').split(",");
                    listObject[data[i].FileName]["Tester"] = data[i].Tester;
                    listObject[data[i].FileName]["mode"] = [];
                }
                listObject[data[i].FileName]["mode"].push({
                    "RunType" : data[i].RunType,
                    "ThePrecision" : data[i].ThePrecision, 
                    "SolverType" : data[i].SolverType, 
                    "Platform" : data[i].Platform, 
                    "Threads" : data[i].Threads, 
                    "PostThreads" : data[i].PostThreads,
                    "ParVersion" : data[i].ParVersion,  
                    "MPIVersion" : data[i].MPIVersion
                })
                
            }
            return callback(null, listObject);

        })
        


    }
}
module.exports = Assignment;