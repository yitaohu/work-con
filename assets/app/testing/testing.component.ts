import { NgForm } from "@angular/forms";
import { Component, OnInit, Input } from '@angular/core';


import { TestingService } from './testing.service';
import { ConvData } from '../dev/convData.model';

@Component({
    selector: 'app-testing',
    templateUrl: './testing.component.html',
    styles:[`
        .loader {
            border: 16px solid #f3f3f3; /* Light grey */
            border-top: 16px solid #3498db; /* Blue */
            border-radius: 50%;
            width: 120px;
            height: 120px;
            animation: spin 2s linear infinite; }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `]
})

export class TestingComponent {
    constructor(private testingService: TestingService) { };

    @Input() plot: ConvData;
    @Input() originalData;
    notRunStd = [];
    failedStd = [];

    private loadingComplete = false;
    private isLoading = false;

    onSubmit(form: NgForm) {
        this.getTest(form);
        console.log('onSubmit');
    }
    // getAllData() {
    //     this.testingService.getAllFiles()
    //         .subscribe(
    //             data => console.log(data),
    //             error => console.error(error)
    //         )
    // }

    
    getTest(testForm: NgForm) {

        this.notRunStd = [];
        this.failedStd = [];
        
        let testListPath = encodeURIComponent(testForm.value.testListPath);
        let beginTime = testForm.value.begintime;
        let endTime = testForm.value.endtime;
        let precision = testForm.value.precision;
        let runType = testForm.value.runType;
        let thread = testForm.value.thread;
        let interconnect = testForm.value.interconnect;
        let mpi = testForm.value.mpi;
        let platform = testForm.value.platform;
        let buildId = testForm.value.buildId;
        let testEngineer = testForm.value.testEngineer;
        let resultsDir = encodeURIComponent(testForm.value.resultsDir);
        let databaseTable = testForm.value.databaseTable;
        let customBuildPath = encodeURIComponent(testForm.value.run2);
        let version = testForm.value.version;


        let qValue = [testListPath, beginTime, endTime, precision,
            runType, thread, interconnect, mpi, platform,
            buildId, testEngineer, databaseTable, resultsDir, customBuildPath, version]
        console.log(qValue);

        this.isLoading = true;
        this.loadingComplete = false;

        this.testingService.getTest(qValue)
            .subscribe(
                data => {
                    console.log("dev con " + data);
                    console.log(data);
                    this.notRunStd = data.Not_Run_Std;
                    delete data.Not_Run_Std;
                    var failedStdObject = data.Failed_Std;
                    console.log(failedStdObject);
                    for(let i = 0; i < failedStdObject.length; i++) {
                        this.failedStd.push([Object.keys(failedStdObject[i]), Object.values(failedStdObject[i])[0][0], Object.values(failedStdObject[i])[0][1]])
                    }
                    delete data.Failed_Std;
                    var myResult = this.dataProcess(data);
                    this.plot = new ConvData(myResult[1], myResult[0], true);
                    this.originalData = myResult;
                    this.isLoading = false;
                    this.loadingComplete = true;
                    console.log("dev component");
                    // console.log(myResult);
                    console.log(this.originalData);
                    console.log("++not run+++");
                    console.log(this.notRunStd);
                    console.log(this.failedStd);
                },
                error => console.error(error)
            )
    }

    dataProcess(data: Object[]) {
        var testName = [];
        var convNum = [];
        var sortable = [];
        var run1conv = [];
        var run2conv = [];
        var outDir1 = [];
        var outDir2 = [];
        for (var testItem in data) {
            sortable.push([testItem, data[testItem][2], data[testItem][0], data[testItem][1], data[testItem][3], data[testItem][4]]);
        }

        sortable.sort(function (a, b) {
            return b[1] - a[1];
        });
        sortable.forEach(function (Element) {
            testName.push(Element[0]);
            convNum.push(Element[1]);
            run1conv.push(Element[2]);
            run2conv.push(Element[3]);
            outDir1.push(Element[4]);
            outDir2.push(Element[5]);

        })

        return [testName,
            convNum,
            run1conv,
            run2conv,
            outDir1,
            outDir2
        ];
    }

}