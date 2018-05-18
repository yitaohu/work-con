var fs = require('fs');
const { URL } = require('url');
var mysql = require('mysql');
var async = require('async');
var db = require('../mysql/dbconnection');
var FileListProc = require('../filelistproc')

var Assignment = {
    getAssign: function(filter, callback) {
        var databaseTableAssign= "DailyTestSchedule";
        // var listFilePath= "file://lebqa01.ansys.com/export/testing/matrix/fbutests/fluent/develop/lists";
        var listFilePath= "file://lebqa01.ansys.com/fluentqa/FLUENT/v19.2/rding/features/vts/script/list";
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
        console.log(sqlQuery);
        db.query(sqlQuery, function(err, data){
            console.log(data);
            for(let i = 0; i < data.length; i++) {
                if(!listObject[data[i].FileName]) {
                    listObject[data[i].FileName] = {};

                    filePath = new URL(listFilePath +"/" +data[i].FileName);
                    // console.log("++++filepath");
                    // console.log(filePath);
                    listObject[data[i].FileName]["testArray"] = fs.readFileSync(filePath, 'utf8').replace(/\n|\s/g, ',').slice(0,-1).split(",");
                    listObject[data[i].FileName]["Tester"] = data[i].Tester;
                    listObject[data[i].FileName]["mode"] = [];
                    listObject[data[i].FileName]["listName"] = data[i].FileName;
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

        myQueryParallel = "SELECT Testname, Result, Testdir, Threads \
                    FROM ?? \
                    WHERE Testname IN (?) AND Platform = ? AND ThePrecision = ? AND Threads = ? AND RunType = ? \
                        AND Tester = ? AND Version = ? AND PostThreads = ? AND ParVersion = ? AND MPIVersion = ? \
                        AND TimeDateStamp BETWEEN ? AND ?\
                    ORDER BY Testname ASC, TimeDateStamp ASC";  //no buildID
        myQuerySerial =  "SELECT Testname, Result, Testdir, Threads \
                    FROM ?? \
                    WHERE Testname IN (?) AND Platform = ? AND ThePrecision = ? AND Threads = ? AND RunType = ? \
                        AND Tester = ? AND Version = ?  AND PostThreads = ? \
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

        async.mapSeries(assignObject, function(listitem, callback1){
            resultReg[listitem.listName] = {};
            insert[1] = listitem.testArray;
            insert[6] = listitem.Tester;
            // console.log("))))))))")
            // console.log(listitem);
            async.mapSeries(listitem.mode, function(item,callback2){
                assignString = assemble(item);
                // console.log("+++++++++")
                // console.log(assignString)
                for (let m = 0; m < listitem.testArray.length; m++) {
                    if(resultReg[listitem.listName][listitem.testArray[m]]) {
                        resultReg[listitem.listName][listitem.testArray[m]].push(item); 
                    }else {
                        resultReg[listitem.listName][listitem.testArray[m]] = [item]; 
                    } 
                }

                insert[2] = item.Platform;//2
                insert[3] = item.ThePrecision;//3
                insert[4] = item.Threads;//4
                insert[5] = item.RunType;//5
                insert[9] = item.ParVersion;//8
                insert[10] = item.MPIVersion;//9
                insert[8] = item.PostThreads;//9
                if(item.SolverType == "parallel") {
                    sqlQuery = mysql.format(myQueryParallel,insert);
                }else {
                    insert2 = insert.slice(0,9);
                    insert2.push(insert[11]);
                    insert2.push(insert[12]);
                    // console.log(insert2);
                    // console.log(insert);
                    sqlQuery = mysql.format(myQuerySerial,insert2);
                }
                console.log("++++++++++query+++++++++")
                console.log(sqlQuery);
                db.query(sqlQuery, function(err, data){
                    // console.log("******query data********")
                    // console.log(data);
                    for(let j = 0; j < data.length; j++) {
                        // console.log("++++++++query data++++++++")
                        // console.log(data[j])
                        if(data[j].Result == "S" || data[j].Result == "NP") {
                            resultReg[listitem.listName][data[j].Testname].splice(-1,1);
                        }
                        
                    }
                    // console.log(resultReg[item]);
                    return callback2(null, data);

                })
            },callback1)
        },function(err, result){
            return callback(null, resultReg)
        })
    }
}
function assemble(modeObject) {
    res = modeObject.Platform+" in "+modeObject.SolverType+" "+
    modeObject.RunType+" for "+modeObject.ThePrecision+" and postthread "+modeObject.Threads+" and threads "+modeObject.PostThreads+" parallel interconnect "
    +modeObject.ParVersion+" and mpi "+modeObject.MPIVersion;
    return res;

}

module.exports = Assignment;