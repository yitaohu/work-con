var mysql = require('mysql');

// var sqlb = "SELECT Testdir FROM ?? WHERE Testname=? AND Platform='win64' AND TimeDateStamp between '2017-11-16 16:50:39' and '2017-11-18 16:50:39'";

var QueryCreate = {
    createQueryArray: function (qValue) {
        const TABLE = ["reg_dev","flcore_dev", "regular_dev"];//
        const precision = "dp";
        //,"reg_dev","flcore_dev","regular_dev"
        var sql = "(SELECT Testdir, Result, Bug, TimeDateStamp FROM ?? WHERE Testname=?";
        
        sql += this.createString("ThePrecision",precision);
        sql += this.createString("Platform",qValue.Platform)
        sql += this.createString("RunType",qValue.RunType)
        sql += this.createString("Threads",qValue.Threads)
        sql += this.createString("BuildId",qValue.BuildId);
        sql += this.createString("Tester",qValue.Tester);
        sql += this.createString("Version",qValue.Version);
        sql += " AND TimeDateStamp between ? and ?)"
        // sql += " ORDER BY TimeDateStamp DESC LIMIT 1"
        realSQL = sql;
        for(let m = 0; m < TABLE.length - 1; m++) {
            realSQL += " UNION " + sql;
        }

        var sqlArray = [];
        // console.log(sql);
        for(let i = 0; i < qValue.testListPath.length; i++) {
            if(qValue.testListPath[i] !== "") {
                var inserts = [];
                for (let i_t = 0; i_t < TABLE.length; i_t++) {
                    inserts = inserts.concat([ TABLE[i_t],
                        qValue.testListPath[i],
                        qValue.beginTime, 
                        qValue.endTime
                    ])
                }
                // console.log(qValue.testListPath[i]);
                var object = {};
                // console.log(inserts);
                // console.log(realSQL);
                object[qValue.testListPath[i]] = mysql.format(realSQL, inserts) + " ORDER BY TimeDateStamp DESC LIMIT 1";
                // console.log(object);
                sqlArray.push(object);

            }          
        }
        // console.log(sqlArray);
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