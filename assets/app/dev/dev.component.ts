import { NgForm } from "@angular/forms";
import { Component, OnInit } from '@angular/core';


import { DevService } from './dev.service';

@Component({
    selector: 'app-dev',
    templateUrl: './dev.component.html'
})

export class DevComponent{
    showPlot = false;
    plotData = [];
    plotTest = [];
    constructor(private devService: DevService) {this.plotData = []};
    
    onSubmit(form: NgForm) {
        var myTestString = form.value.testname;
        var myPath1 = form.value.run1;
        var myPath2 = form.value.run2; 
        var myTestsArray = myTestString.split(",")
        this.devService.getAllConvNum(myTestsArray, myPath1)
        .subscribe(
            data => {
                console.log(data);
                var myResult= this.dataProcess(data);
                this.plotData = myResult[1];
                this.plotTest = myResult[0];
                console.log(this.plotData);
                console.log(this.plotTest);
            },
            error => console.log(error)
        )
        this.showPlot = true;

    }

    dataProcess(data:Object[]) {
        var testName = [];
        var convNum = [];
        data.forEach(function(element) {
            testName.push(Object.keys(element)[0]);
            convNum.push(Object.values(element)[0]);            
        })
        return [testName,convNum];
    }
}