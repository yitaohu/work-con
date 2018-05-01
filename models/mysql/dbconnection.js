var mysql=require('mysql');
var connection=mysql.createPool({
    host    : 'lebpbur410.ansys.com',
    user    : 'testing',
    password: 'testing',
    database: 'Fluent_QA',
});
module.exports=connection;