var mysql = require('mysql');

// var sqlb = "SELECT Testdir FROM ?? WHERE Testname=? AND Platform='win64' AND TimeDateStamp between '2017-11-16 16:50:39' and '2017-11-18 16:50:39'";

var QueryCreate = {
    createQueryArray: function (qValue) {
        
        var sql = "SELECT Testdir FROM ?? WHERE Testname=?";
        
        sql += this.createString("ThePrecision",qValue.ThePrecision);
        sql += this.createString("Platform",qValue.Platform)
        sql += this.createString("RunType",qValue.RunType)
        sql += this.createString("Threads",qValue.Threads)
        sql += this.createString("ParVersion",qValue.ParVersion)
        sql += this.createString("MPIVersion",qValue.MPIVersion)
        sql += this.createString("BuildId",qValue.BuildId);
        sql += this.createString("Tester",qValue.Tester);
        sql += this.createString("Version",qValue.Version);
        sql += " AND TimeDateStamp between ? and ?"
        sql += " ORDER BY TimeDateStamp DESC LIMIT 1"

        var sqlArray = [];
        for(let i = 0; i < qValue.testListPath.length; i++) {
            if(qValue.testListPath[i] !== "") {
                var inserts = [ qValue.databaseTable,
                    qValue.testListPath[i],
                    qValue.beginTime, 
                    qValue.endTime
                ];
                // console.log(qValue.testListPath[i]);
                var object = {};
                object[qValue.testListPath[i]] = mysql.format(sql, inserts);
                sqlArray.push(object)

            }          
        }
        return sqlArray
    },

    createString(varName,varValue) {
        if(varValue === "All" || varValue === '') {
            return "";
        }else {
            return " AND "+varName + "='" + varValue +"' ";
        }
    }
};
module.exports = QueryCreate;