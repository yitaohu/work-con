var fs = require('fs');
const {URL} = require('url');

var parseFileName = function(FileName) {
    data = FileName.split(".");
    
    if (data.length < 5) {
        return null;
    }

    test=data[0];
    mode=data[1];
    precision=data[2];
    Os=data[3];
    timestamp=data[4];

    return parseDate(timestamp);
}

var parseDate = function(timeSting) {
    myTime=timeSting.split('_');
    myYear="20"+myTime[0];
    myMonth=myTime[1];
    myDate=myTime[2];
    myHour=myTime[3];
    myMin=myTime[4];
    mySec=myTime[5];

    realTime = new Date(parseInt(myYear),parseInt(myMonth)-1,parseInt(myDate),parseInt(myHour),parseInt(myMin),parseInt(mySec));

    return realTime.getTime();
    
}


var Tools={
    getTestDir: function(myTestName, callback) {
        path=myTestName;
        if(!myTestName) {
            return callback(null,null);
        }
        fs.readdir(path, function(err, files){
            if (err) {
                return callback(err, null);
            }
            var latest_run = 0;
            var latest_test = files[0];
            files.forEach(function(Element){
                run_time = parseFileName(Element);
                
                if (run_time == null) {
                    return;
                }
                if (run_time > latest_run) {
                    latest_run = run_time;
                    latest_test=Element;
                }
            })  
            return callback(null, latest_test);   
        })
    },
    
    getPathArray:function(TestNameArray,Result_dir) {
        var pathArray = [];
        solver = "fluent";
        test_version = "v19.1.0";
    
        TestNameArray.forEach(function(Element){
            if(!Element) {
                return;
            }
            path = new URL(Result_dir+ "/" + solver+ "/" + Element+ "/" + test_version);
            // console.log(path);
            pathArray.push({[Element]:path});
        })
        
        return pathArray;
    },

};
module.exports=Tools;