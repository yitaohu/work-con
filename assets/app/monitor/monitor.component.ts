import { NgForm } from "@angular/forms";
import { Component, OnInit, Input } from '@angular/core';

import { MonitorService } from './monitor.service';

@Component({
    selector: 'app-monitor',
    templateUrl: './monitor.component.html',
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

export class MonitorComponent implements OnInit {
    constructor(private monitorService: MonitorService) { };
    
    resutlstring=[];
    isResultReady = false;

    def_version ;
    def_testListPath ;
    def_days ;
    def_projectType ;
    def_databaseTable ;
    def_precision ;
    def_runType ;
    def_thread ;
    def_platform ;
    

    def_resultsDir ;
    ngOnInit() {
        this.def_version = "19.2.0";
        this.def_testListPath = "/net/lebqa01/export/testing/matrix/fbutests/fluent/develop/lists";
        this.def_days = "1";
        this.def_projectType ="Daily_Reg_dev";
        this.def_databaseTable ="reg_dev";
        this.def_precision = "All";
        this.def_runType = ["All"];
        this.def_thread = ["All"];
        this.def_platform = "All";
    

        this.def_resultsDir = "/net/lebqa01/export/testing/matrix/RESULTS";
        this.isResultReady = false;
    }

    onSubmit(form: NgForm) {
        this.getTest(form);
        console.log('onSubmit');
    }

    
    getTest(testForm: NgForm) {

        let version = testForm.value.version;
        let testListPath = encodeURIComponent(testForm.value.testListPath);
        let days = testForm.value.days;
        let projectType = testForm.value.projectType;
        let databaseTable = testForm.value.databaseTable;
        let precision = testForm.value.precision;
        let runType = testForm.value.runType;
        let thread = testForm.value.thread;
        let platform = testForm.value.platform;
        let buildId = testForm.value.buildId;
        let testEngineer = testForm.value.testEngineer;
        let resultsDir = encodeURIComponent(testForm.value.resultsDir);
        
        


        let qValue = [version, testListPath, days, projectType, databaseTable,precision, 
            runType, thread, platform,
            buildId, testEngineer,  resultsDir ]
        console.log(qValue);

        this.monitorService.getTest(qValue)
            .subscribe(
                data => {
                    console.log("dev con ");
                    // console.log(Array.isArray(data));
                    this.resutlstring = data;
                    this.isResultReady = true;

                },
                error => console.error(error)
            )
    }
}