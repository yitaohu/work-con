var fs = require('fs');
const { URL } = require('url');
var mysql = require('mysql');
var async = require('async');
var db = require('../mysql/dbconnection');
var FileListProc = require('../filelistproc')

var Assignment = {
    getAssign: function(filter, callback) {
        
        var databaseTableAssign= "DailyTestSchedule";

        var myQuery = "SELECT FileName, RunType, ThePrecision, SolverType, ParVersion, Platform, Tester, Threads, PostThreads, MPIVersion \
                        FROM ?? \
                        WHERE ProjectName=? ";


        var testListPath= filter.testListPath;
        var projectType = filter.projectType;
        var runType = filter.runType;
        var thePrecision = filter.thePrecision;
        var platform = filter.platform;
        var threads = filter.threads;
        var tester = filter.tester;


        myQuery += createString("RunType",runType);
        myQuery += createString("ThePrecision",thePrecision);
        myQuery += createString("Platform",platform);
        myQuery += createString("Threads",threads);
        myQuery += createString("Tester",tester);
        myQuery += "ORDER BY FileName DESC"



        sqlQuery = mysql.format(myQuery,[databaseTableAssign, projectType]);
        listObject = {};
        // console.log(sqlQuery);
        db.query(sqlQuery, function(err, data){
            // console.log(data);
            if (err) {
                return callback(err, null);
            }
            for(let i = 0; i < data.length; i++) {
                if(!listObject[data[i].FileName]) {
                    listObject[data[i].FileName] = {};

                    filePath = new URL(testListPath +"/" +data[i].FileName);
                    // console.log("++++filepath");
                    // console.log(filePath);
                    fileString=fs.readFileSync(filePath, 'utf8').replace(/\n|\s/g, ',');
                    if (fileString.slice(-1)==',') {
                        listObject[data[i].FileName]["testArray"] = fileString.slice(0,-1).split(",")
                    } else {
                        listObject[data[i].FileName]["testArray"] = fileString.split(",")
                    }
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
        var days = filter.days;
        var version = filter.version;
        var buildId = filter.buildId;
        var databaseTableREG = filter.databaseTable; 
        var today = new Date();
        var yesterday = new Date(today.getTime());
        yesterday.setDate(today.getDate() - days);

        myQueryParallel = "SELECT Testname, Result, Testdir, Threads, Bug, Notes \
                    FROM ?? \
                    WHERE Testname IN (?) AND Platform = ? AND ThePrecision = ? AND Threads = ? AND RunType = ? \
                        AND Tester IN (?) AND Version = ? AND PostThreads = ? AND ParVersion = ? AND MPIVersion = ? \
                        AND TimeDateStamp BETWEEN ? AND ?\
                    ORDER BY Testname ASC, TimeDateStamp DESC";  //no buildId
        myQuerySerial =  "SELECT Testname, Result, Testdir, Threads, Bug, Notes \
                    FROM ?? \
                    WHERE Testname IN (?) AND Platform = ? AND ThePrecision = ? AND Threads = ? AND RunType = ? \
                        AND Tester IN (?) AND Version = ?  AND PostThreads = ? \
                        AND TimeDateStamp BETWEEN ? AND ?\
                    ORDER BY Testname ASC, TimeDateStamp DESC";  //no buildId

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
            
            insert[6] = [listitem.Tester,"flutest:"+listitem.Tester];
            // console.log("))))))))")
            // console.log(listitem);
            async.mapSeries(listitem.mode, function(item,callback2){
                // assignString = assemble(item);
                // console.log("+++++++++")
                // console.log(assignString)
                item.Tester = listitem.Tester;
                var cleanUpTestArray = [];
                for (let m = 0; m < listitem.testArray.length; m++) {
                    if (listitem.testArray[m] == "" || listitem.testArray[m].match(/^#|^;/)){
                        continue;
                    }
                    cleanUpTestArray.push(listitem.testArray[m]);
                    if(resultReg[listitem.listName][listitem.testArray[m]]) {
                        resultReg[listitem.listName][listitem.testArray[m]].push(item); 
                    }else {
                        resultReg[listitem.listName][listitem.testArray[m]] = [item]; 
                    } 
                }
                insert[1] = cleanUpTestArray;
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
                // console.log(sqlQuery);
                db.query(sqlQuery, function(err, data){
                    // console.log(sqlQuery);
                    if(err) {
                        return callback2(err, null);
                    }

                    for(let j = 0; j < data.length; j++) {
                        // console.log("++++++++query data++++++++")
                        // console.log(data[j])
                        if (j - 1 > 0 && data[j].Testname == data[j - 1].Testname ) {
                            continue;
                        }
                        if(data[j].Result == "S" || data[j].Result == "NP") {
                            // console.log(data[j].Testname);
                            resultReg[listitem.listName][data[j].Testname].splice(-1,1);
                        }
                        
                    }
                    // console.log(resultReg[item]);
                    return callback2(null, data);

                })
            },function(err, da){
                if(err) {
                    return callback1(err, null);
                }
                if(da) {
                    return callback1(null, da);
                }
            })
        },function(err, result){
            // console.log(resultReg)
            if (err) {
                return callback(err,null);
            }
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
function createString(varName,varValue) {
    if (Array.isArray(varValue)) {
        if(varValue.length === 0 || varValue.includes('All') || varValue.includes('ALL')) {
            return "";
        }else {
            let myQ = " AND "+varName+" IN (?) "
            realQ = mysql.format(myQ,varValue);
            return realQ;
        }
    } else {
        if(varValue === "All" || varValue === ''|| varValue === "ALL") {
            return "";
        }else {
            return " AND "+varName + "='" + varValue +"' ";
        }
    }
}
module.exports = Assignment;