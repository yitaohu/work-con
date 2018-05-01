var Task = require("./task");

Task.getAllTasks(function(err, res) {
    if (err) throw err;
    console.log(res);
})