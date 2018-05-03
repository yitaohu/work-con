import { NgForm } from "@angular/forms";
import { Component, OnInit } from '@angular/core';


import { TestingService } from './testing.service';

@Component({
    selector: 'app-testing',
    templateUrl: './testing.component.html'
})

export class TestingComponent{
    constructor(private testingService: TestingService) {};
    onSubmit(form: NgForm) {
        this.getTest(form);
        console.log('onSubmit');
    }
    getAllData() {
        this.testingService.getAllFiles()
            .subscribe(
                data => console.log(data),
                error => console.error(error)
            )
    }


    getTest(testForm: NgForm) {
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

        
        let qValue=[testListPath, beginTime, endTime, precision, 
            runType, thread, interconnect, mpi, platform, 
            buildId, testEngineer, databaseTable, resultsDir ]
        console.log(qValue);
        
        this.testingService.getTest(qValue)
            .subscribe(
                data => console.log(data),
                error => console.error(error)
            )
    }

}