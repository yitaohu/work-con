var fs = require('fs');
const { URL } = require('url');
var mysql = require('mysql');
var db = require('./dbconnection');

var Assignment = {
    getAssign: function(filter, callback) {
        var databaseTable= "DailyTestSchedule";
        var listFilePath= "/net/lebqa01/export/testing/matrix/fbutests/fluent/develop/lists";
        var projectName = filter.projectName;
        var myQuery = "SELECT FileName, RunType, ThePrecision, SolverType, ParVersion, Platform, Tester, Threads FROM ?? WHERE ProjectName=? ORDER BY FileName DESC";

        sqlQuery = mysql.format(myQuery,[databaseTable, projectName]);
        result = [];
        db.query(sqlQuery, function(err, data){
            for(let i = 0; i < data.length; i++) {
                if (data.RunType == filter.RunType &&
                     data.ThePrecision == filter.ThePrecision &&
                     data.SolverType == filter.SolverType &&
                     data.ParVersion == filter.ParVersion &&
                     data.Platform
                    )
            }
        })


    }
}