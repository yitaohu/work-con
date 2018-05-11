var fs = require('fs');
const { URL } = require('url');
var mysql = require('mysql');
var async = require('async');
var db = require('../mysql/dbconnection');
var FileListProc = require('../filelistproc')

var Assignment = {
    getAssign: function(filter, callback) {
        var databaseTableAssign= "DailyTestSchedule";
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

        sqlQuery = mysql.format(myQuery,[databaseTableAssign, projectName, runType, thePrecision, platform, threads, tester]);
        listObject = {};
        db.query(sqlQuery, function(err, data){
            
            for(let i = 0; i < data.length; i++) {
                if(!listObject[data[i].FileName]) {
                    listObject[data[i].FileName] = {};

                    filePath = new URL(listFilePath +"/" +data[i].FileName);
                    // console.log("++++filepath");
                    // console.log(filePath);
                    listObject[data[i].FileName]["testArray"] = fs.readFileSync(filePath, 'utf8').replace(/\n|\s/g, ',').slice(0,-1).split(",");
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
    },

    queryCreate: function(assignObject, filter, callback) {
        var day = filter.day;
        var version = filter.version;
        var buildID = filter.buildID;
        var databaseTableREG = filter.databaseTable; 
        var today = new Date();
        var yesterday = new Date(today.getTime());
        yesterday.setDate(today.getDate() - day);

        myQuery = "SELECT Testname, Result, Testdir \
                    FROM ?? \
                    WHERE Testname IN (?) AND Platform = ? AND ThePrecision = ? AND Threads = ? AND RunType = ? \
                        AND Tester = ? AND Version = ? AND ParVersion = ? AND MPIVersion = ? AND PostThreads = ? \
                        AND TimeDateStamp BETWEEN ? AND ?\
                    ORDER BY Testname ASC, TimeDateStamp ASC";  //no buildID 

        insert = [
            databaseTableREG,//0-
            ,//1-
            ,//2
            ,//3
            ,//4
            ,//5
            ,//6-
            version,//7
            ,//8
            ,//9
            ,//10
            yesterday,
            today
        ]
        resultReg = {};
        async.forEachOf(assignObject,function(curr,key,callback){
            resultReg[key] = {};
            insert[1] = curr.testArray;
            insert[6] = "flutest:"+curr.Tester;
            async.forEach
        },function(err){
            console.log("DONE");
        })


        for(let item in assignObject) {
            resultReg[item] = {};
            insert[1] = assignObject[item].testArray;
            insert[6] = "flutest:"+assignObject[item].Tester;

            for(let i = 0; i < assignObject[item].mode.length; i++) {
                assignString = assemble(assignObject[item].mode[i]);
                
                for (let m = 0; m < assignObject[item].testArray.length; m++) {
                    if(resultReg[item][assignObject[item].testArray[m]]) {
                        resultReg[item][assignObject[item].testArray[m]].push(assignString); 
                    }else {
                        resultReg[item][assignObject[item].testArray[m]] = [assignString]; 
                    } 
                }

                insert[2] = assignObject[item].mode[i].Platform;//2
                insert[3] = assignObject[item].mode[i].ThePrecision;//3
                insert[4] = assignObject[item].mode[i].Threads;//4
                insert[5] = assignObject[item].mode[i].RunType;//5
                insert[8] = assignObject[item].mode[i].ParVersion;//8
                insert[9] = assignObject[item].mode[i].MPIVersion;//9
                insert[10] = assignObject[item].mode[i].PostThreads;//9
                sqlQuery = mysql.format(myQuery,insert);
                // console.log(sqlQuery);
                db.query(sqlQuery, function(err, data){
                    // console.log(data);
                    for(let j = 0; j < data.length; j++) {
                        // console.log("++++++++query data++++++++")
                        // console.log(data[j])
                        resultReg[item][data[j].Testname].splice(-1,1, data[j].Result);
                    }
                    // console.log(resultReg[item]);
                    return callback(null,resultReg);

                })
            }   
        }
        


    }
}
function assemble(modeObject) {
    res = modeObject.Platform+" in "+modeObject.SolverType+" "+
    modeObject.RunType+" for "+modeObject.dp+" and postthread "+modeObject.Threads+" and threads "+modeObject.PostThreads+" parallel interconnect "
    +modeObject.ParVersion+" and mpi "+modeObject.MPIVersion;
    return res;

}

module.exports = Assignment;