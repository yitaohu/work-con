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
            AND SolverBin=? \
            AND TimeDateStamp between ? and ?";

// var sqlb = "SELECT Testdir FROM ?? WHERE Testname=? AND Platform='win64' AND TimeDateStamp between '2017-11-16 16:50:39' and '2017-11-18 16:50:39'";

var Query = {
    createQuery: function (qValue) {
        testname = qValue[0];
        begintime = qValue[1];
        endtime = qValue[2];
        var inserts = ['reg_191', testname, begintime, endtime];
        sql = mysql.format(sql, inserts);
        return sql
    }
};
module.exports = Query;

