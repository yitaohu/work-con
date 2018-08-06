const { URL } = require('url');
var mysql = require('mysql');

var db = require('../mysql/dbconnection');
var FileListProc = require('../filelistproc')
var Assignment = require('./assignment');



var DataResult = {
    getResult:function (filter, callback) {
        Assignment.getAssign(filter, function(err, data){
            if (err) {
                return callback(err, null);
            }
            Assignment.queryCreate(data,filter, function(err, res){
                // console.log(res);
                if (err) {
                    return callback(err, null);
                }
                scriptstring = [];
                myRes = {};
                for(let listNameItem in res) {
                    myRes[listNameItem] = {};
                    for(let testname in res[listNameItem]) {
                        myRes[listNameItem][testname] = [];
                        if (res[listNameItem][testname].length>0) {
                            for(let i = 0; i < res[listNameItem][testname].length; i++) {
                                data[listNameItem];
        
                                Platform = res[listNameItem][testname][i].Platform;
                                
                                RunType = res[listNameItem][testname][i].RunType;
                                if(res[listNameItem][testname][i].ThePrecision == "dp"){
                                    ThePrecision = "double";
                                }else {
                                    ThePrecision=""
                                }
                                Threads = "-t" + res[listNameItem][testname][i].Threads;
                                PostThreads = "-postt"+res[listNameItem][testname][i].PostThreads;
                                if(res[listNameItem][testname][i].ParVersion == "-" || res[listNameItem][testname][i].ParVersion == "default") {
                                    ParVersion = ""
                                } else {
                                    ParVersion = "-p" + res[listNameItem][testname][i].ParVersion;
                                }
                                if(res[listNameItem][testname][i].MPIVersion == "-" || res[listNameItem][testname][i].MPIVersion == "default") {
                                    MPIVersion = ""
                                } else {
                                    MPIVersion = "-mpi=" +res[listNameItem][testname][i].MPIVersion;
                                }
                                
                                string = "system(\"perl $ENV{'PERL5LIB'}/auto_fluent.pl " + RunType + " " + ThePrecision + " " + Threads + " " + PostThreads + " " + ParVersion + " " 
                                    + MPIVersion + " fluent v19.2.0 " +testname + "\")";
                                scriptstring.push(string);
                                myRes[listNameItem][testname].push(string);
                                
                            }
                        }
                        
                    }
                }

                return callback(null,res);
            
            })
        })
        
    }
}

module.exports = DataResult;


function assemble(modeObject) {
    res = modeObject.Platform+" in "+modeObject.SolverType+" "+
    modeObject.RunType+" for "+modeObject.ThePrecision+" and postthread "+modeObject.Threads+" and threads "+modeObject.PostThreads+" parallel interconnect "
    +modeObject.ParVersion+" and mpi "+modeObject.MPIVersion;
    return res;

}


