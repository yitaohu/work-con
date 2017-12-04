var mysql=require('mysql');

var sql = "SELECT Testdir FROM ?? WHERE Testname=? AND Platform='win64' AND TimeDateStamp between '2017-11-16 16:50:39' and '2017-11-18 16:50:39'";

var Query={
    createQuery:function(qValue) {
        var inserts = ['reg_19', qValue ];
        sql = mysql.format(sql, inserts);
        return sql
    }
};
module.exports=Query;