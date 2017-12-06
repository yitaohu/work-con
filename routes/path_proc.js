var fs = require('fs');
const {URL} = require('url');

// curr_path = "file://lebqa01.ansys.com/users/yihu/yihu/web/Result2";
curr_path = "file:///Users/Yitao/Documents/FrontEnd/Ansys_Work/ansys_myhome_web/Result1";
solver = "fluent";
test_version = "v19.0.0";
test_name="slab_rad";
path = new URL(curr_path+ "/" + solver+ "/" + test_name+ "/" + test_version);
// path = '../../ansys_myhome_web/Result2'
fs.readdir(path, function(err, files){
    files.forEach(function(Element){
        console.log(parseFileName(Element));
    })
})

var parseFileName = function(FileName) {
    data = FileName.split(".");
    if (data.length < 5) {
        return;
    }
    test=data[0];
    mode=data[1];
    precision=data[2];
    Os=data[3];
    timestamp=data[4];
    console.log(timestamp);
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
    console.log(parseInt(myHour));
    realTime = new Date(parseInt(myYear),parseInt(myMonth)-1,parseInt(myDate),parseInt(myHour),parseInt(myMin),parseInt(mySec));
    
    return realTime;
    
}