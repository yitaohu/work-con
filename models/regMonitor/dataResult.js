var fs = require('fs');
const { URL } = require('url');
var mysql = require('mysql');

var db = require('../mysql/dbconnection');
var FileListProc = require('../filelistproc')
var Assignment = require('./assignment');



var DataResult = {
    getResult:function (filter, callback) {
        Assignment.getAssign(filter, function(err, data){
            Assignment.queryCreate(data,filter, function(err, res){
                // console.log(res);
                scriptstring = [];
                for(let item in res) {
                    for(let testname in res[item]) {
                        if (res[item][testname].length>0) {
                            for(let i = 0; i < res[item][testname].length; i++) {
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
                                
                                string = "system(\"perl $ENV{'PERL5LIB'}/auto_fluent.pl " + RunType + " " + ThePrecision + " " + Threads + " " + PostThreads + " " + ParVersion + " " 
                                    + MPIVersion + " fluent v19.2.0 " +testname + "\")";
                                scriptstring.push(string);
                                
                            }
                        }
                        
                    }
                }
                
                // fs.writeFile('rongtest.txt', scriptstring.join("\n"), function (err) {
                //     if (err) throw err;
                //     console.log('Saved!');
                //   });

                return callback(null,scriptstring);
            
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


