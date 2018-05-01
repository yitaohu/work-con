var mysql = require('mysql');

var Query = require('./query');
var db = require('./dbconnection');

var Task = {
    getAllTasks: function (callback) {
        myquery = "SELECT * FROM reg_191 WHERE Testname in ('3d_fwh_steady','cyl2d_edb_fwh') AND Platform=? AND ThePrecision='dp' AND Threads='8' AND TimeDateStamp between '2018-03-30 14:37:11' and '2018-04-03 14:37:13'";
        // testNameArray = ""
        return db.query(myquery,'lnamd64',callback);
    },
    getTest: function (qValue, callback) {

        console.log("qa++++++++++++");
        console.log("qValue");        
        sql = Query.createQuery(qValue);
        console.log(sql);
        return db.query(sql, callback);
    }
};
module.exports = Task;

