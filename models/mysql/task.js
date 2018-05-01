var mysql = require('mysql');

// var Query = require('./query');
var db = require('./dbconnection');

var Task = {
    getAllTasks: function (callback) {
        myquery = "SELECT * FROM reg_191 WHERE Testname='dpm-part-rot-wall-rebound' AND Platform='lnamd64' AND ThePrecision='dp' AND Threads='8' AND TimeDateStamp between '2018-03-30 14:37:11' and '2018-04-03 14:37:13'";
        return db.query(myquery, callback);
    },
    // getTest: function (qValue, callback) {


    //     sql = Query.createQuery(qValue);
    //     console.log(sql);
    //     return db.query(sql, callback);
    // }
};
module.exports = Task;

