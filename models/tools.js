var fs = require('fs');
const {URL} = require('url');

var parseFileName = function(FileName) {
    data = FileName.split(".");
    
    if (data.length < 5) {
        return null;
    }
    os_thread = data[3].split("-");
    if(!os_thread[1]) {
        os_thread[1] = "t0";
    }

    var result = {
        "testname": data[0],
        "runmode": data[1],
        "precision": data[2],
        "OS": os_thread[0],
        "thread": os_thread[1],
        "timestamp": data[4]
    }

    return result;
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
    getTestDir: function(testPath,filter, callback) {
        // console.log("+++++++++Tools getTestDir++++++++++++++++++++")
        // console.log(testPath);
        if(!testPath) {
            return callback(null,null);
        }
        if(!fs.existsSync(testPath)) {
            console.log("path not exist")
            console.log(testPath.href);
            return callback(null,null);
        }// to-do add existing checker in readdir function
        fs.readdir(testPath, function(err, files){
            if (err) {
                return callback(err, null);
            }
            
            // if(!files) {
            //     return callback(null,null);
            // }
            var latest_run = 0;
            var latest_test = null;
            files.forEach(function(Element){
                parsedFileName = parseFileName(Element);
                if (!parsedFileName) {
                    return;
                }
                // console.log(parsedFileName.thread);
                // console.log("++++++++++++++");
                // console.log(filter['thread']);

                if(parsedFileName.runmode !== filter['runMode'] || 
                    parsedFileName.thread !== filter['thread'] ) {
                    return;
                }
                run_time = parseDate(parsedFileName.timestamp);
                
                
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
    
    getPathArray:function(TestNameArray,Result_dir,version) {
        var pathArray = [];
        solver = "fluent";
        test_version = 'v'+version+'.0';//to-do add version selection to UI
    
        TestNameArray.forEach(function(Element){
            if(!Element) {
                return;
            }
            path = new URL(Result_dir + "/" + Element+ "/" + test_version);
            // console.log(path);
            pathArray.push({[Element]:path});
        })
        
        return pathArray;
    },

    addFileToPath:function(inputPath) {
        if  (!inputPath) {
            return inputPath;
        }
        pathStart = inputPath.split('//')[0];
        if (pathStart === "file:") {
            return inputPath;
        } else {
            inputPath = "file:" + inputPath;
            return inputPath;
        }
    }

};
module.exports=Tools;