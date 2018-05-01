var mysql = require('mysql');

var sql = "SELECT Testdir FROM ?? WHERE Testname=? \
            AND ThePrecision=? \
            AND Platform=? \
            AND RunType=? \
            AND Threads=? \
            AND ParVersion=? \
            AND MPIVersion=? \
            AND BuildId=? \
            AND Tester=? \
            AND TimeDateStamp between ? and ?";

// var sqlb = "SELECT Testdir FROM ?? WHERE Testname=? AND Platform='win64' AND TimeDateStamp between '2017-11-16 16:50:39' and '2017-11-18 16:50:39'";

var Query = {
    createQuery: function (qValue) {
        
        var sql = "SELECT Testdir FROM ?? WHERE ";
        var query_testname = "Testname in ('3d_fwh_steady','cyl2d_edb_fwh')";


        sql = sql + query_testname;
        this.createString("ThePrecision",qValue.ThePrecision)
        this.createString("Platform",qValue.Platform)
        this.createString("RunType",qValue.RunType)
        this.createString("Threads",qValue.Threads)
        this.createString("ParVersion",qValue.ParVersion)
        this.createString("MPIVersion",qValue.MPIVersion)
        this.createString("BuildId",qValue.BuildId)
        this.createString("Tester",qValue.Tester)

        // "
        //     AND =? \
        //     AND =? \
        //     AND =? \
        //     AND =? \
        //     AND =? \
        //     AND =? \
        //     AND =? \
        //     AND =? \
        //     AND TimeDateStamp between ? and ?";
        var inserts = [databaseTable, 
                        'dpm-part-rot-wall-rebound', 
                        precision, 
                        platform,
                        runType,
                        thread,
                        interconnect,
                        mpi,
                        buildId,
                        testEngineer,
                        begintime, 
                        endtime
                    ];
        sql = mysql.format(sql, inserts);
        return sql
    },

    createString(varName,varValue) {
        if(varValue === "All") {
            return "";
        }else {
            return varName + "=" + varValue;
        }
    }
};
module.exports = Query;