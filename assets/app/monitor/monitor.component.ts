import { NgForm } from "@angular/forms";
import { Component, OnInit, Input } from '@angular/core';

import { MonitorService } from './monitor.service';

@Component({
    selector: 'app-monitor',
    templateUrl: './monitor.component.html',
    styles: [`
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

    Object = Object;
    resutlstring = {};
    isResultReady = false;
    command = "";

    def_version;
    def_testListPath;
    def_days;
    def_projectType;
    def_databaseTable;
    def_precision;
    def_runType;
    def_thread;
    def_platform;


    def_resultsDir;
    ngOnInit() {
        this.def_version = "19.2.0";
        this.def_testListPath = "/net/lebqa01/export/testing/matrix/fbutests/fluent/develop/lists";
        this.def_days = "1";
        this.def_projectType = "Daily_Reg_dev";
        this.def_databaseTable = "reg_dev";
        this.def_precision = "All";
        this.def_runType = ["All"];
        this.def_thread = ["All"];
        this.def_platform = "All";


        this.def_resultsDir = "/net/lebqa01/export/testing/matrix/RESULTS";
        this.isResultReady = false;
    }

    onSubmit(form: NgForm) {
        this.isResultReady = false;
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




        let qValue = [version, testListPath, days, projectType, databaseTable, precision,
            runType, thread, platform,
            buildId, testEngineer, resultsDir]
        console.log(qValue);

        this.monitorService.getTest(qValue)
            .subscribe(
                data => {
                    console.log("dev con ");
                    console.log(data);
                    this.resutlstring = this.convertToCommandString(data);
                    this.isResultReady = true;
                    // console.log(this.convertToCommandString(data));


                },
                error => console.error(error)
            )
    }

    copyToClipboard() {
        this.command = this.getAllCommand(this.resutlstring);
        var textArea = document.createElement("textarea");
        textArea.style.position = 'fixed';
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = "0";
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.value = this.command;

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }

        document.body.removeChild(textArea);

    }

    getAllCommand(data: Object) {
        console.log(data);
        var listName = [];
        var testname = [];
        var sortable = [];
        var run1conv = [];
        var run2conv = [];
        var outDir1 = [];
        var outDir2 = [];
        for (var listItem in data) {
            for (var testItem in data[listItem]) {
                if ((data[listItem][testItem].length != 0)) {
                    sortable = sortable.concat(data[listItem][testItem]);
                }

            }
        }
        console.log(sortable);
        return sortable.join('\n')
    }

    convertToCommandString(res: Object) {
        var scriptstring = [];
        var myRes = {};
        for (let listNameItem in res) {
            myRes[listNameItem] = {};
            myRes[listNameItem]["listInfo"] = [];
            var inInfo = 0;
            for (let testname in res[listNameItem]) {
                myRes[listNameItem][testname] = [];
                if (res[listNameItem][testname].length > 0) {
                    if (inInfo == 0) {
                        var testIDString = "$ENV{'TESTERUID'} = \"" + res[listNameItem][testname][0].Tester + '";';
                        myRes[listNameItem]["listInfo"].push(testIDString);
                        inInfo=1
                    }
                    for (let i = 0; i < res[listNameItem][testname].length; i++) {
                        var Platform = res[listNameItem][testname][i].Platform;

                        var RunType = res[listNameItem][testname][i].RunType;
                        if (res[listNameItem][testname][i].ThePrecision == "dp") {
                            var ThePrecision = "double";
                        } else {
                            var ThePrecision = ""
                        }
                        var Threads = "-t" + res[listNameItem][testname][i].Threads;
                        var PostThreads = "-postt" + res[listNameItem][testname][i].PostThreads;
                        if (res[listNameItem][testname][i].ParVersion == "-" || res[listNameItem][testname][i].ParVersion == "default") {
                            var ParVersion = ""
                        } else {
                            var ParVersion = "-p=" + res[listNameItem][testname][i].ParVersion;
                        }
                        if (res[listNameItem][testname][i].MPIVersion == "-" || res[listNameItem][testname][i].MPIVersion == "default") {
                            var MPIVersion = ""
                        } else {
                            MPIVersion = "-mpi=" + res[listNameItem][testname][i].MPIVersion;
                        }

                        var string = "system(\"perl $ENV{'PERL5LIB'}/auto_fluent.pl " + RunType + " " + ThePrecision + " " + Threads + " " + PostThreads + " " + ParVersion + " "
                            + MPIVersion + " fluent v19.2.0 " + testname + "\");";
                        scriptstring.push(string);
                        myRes[listNameItem][testname].push(string);
                     
                    }
                }
            }
        }
        return myRes;
    }
}