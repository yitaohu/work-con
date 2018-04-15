import { ConvData } from './convData.model';
import { NgForm } from "@angular/forms";
import { Component, OnInit } from '@angular/core';


import { DevService } from './dev.service';

@Component({
    selector: 'app-dev',
    templateUrl: './dev.component.html',
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

export class DevComponent{
    
    plot = new ConvData([],[],false);
    originalData = [] ;
    private loadingComplete = false;
    private isLoading = false;
    constructor(private devService: DevService) {
        this.plot = new ConvData([],[],false), 
        this.originalData = [];
    };
    
    onSubmit(form: NgForm) {
        var myTestString = form.value.testname;
        var myPath1 = form.value.run1;
        var myPath2 = form.value.run2;
        var myRunMode = form.value.mode;
        var myVersion = form.value.version; 
        var myThread = "t"+form.value.thread;
        this.isLoading = true;
        // var myTestsArray = myTestString.replace(/\n|\s/g,',').split(",")
        this.devService.getAllConvNum(myTestString, myPath1, myPath2,myVersion,myRunMode,myThread)
        .subscribe(
            data => {
                // console.log(data);
                console.log("dev con ");
                console.log(this.originalData);
                var myResult= this.dataProcess(data);
                this.plot = new ConvData(myResult[1],myResult[0],true);
                this.originalData = myResult;
                this.isLoading = false;
                this.loadingComplete = true;
                console.log("dev component");
                console.log(myResult);
            },
            error => {
                this.loadingComplete = true;
                console.log(error)
            }
        )
        

    }

    dataProcess(data:Object[]) {
        var testName = [];
        var convNum = [];
        var sortable = [];
        var run1conv = [];
        var run2conv = [];
        for (var testItem in data) {
            sortable.push([testItem, data[testItem][2],data[testItem][0],data[testItem][1]]);
        }
        
        sortable.sort(function(a, b) {
            return b[1] - a[1];
        });
        sortable.forEach(function(Element) {
            testName.push(Element[0]);
            convNum.push(Element[1]);
            run1conv.push(Element[2]);
            run2conv.push(Element[3]);

        })


        
        return [testName,convNum,run1conv,run2conv];
    }
    
}