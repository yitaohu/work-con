import { ConvData } from './convData.model';
import { NgForm } from "@angular/forms";
import { Component, OnInit } from '@angular/core';


import { DevService } from './dev.service';

@Component({
    selector: 'app-dev',
    templateUrl: './dev.component.html'
})

export class DevComponent{
    
    plot = new ConvData([],[],false);
    constructor(private devService: DevService) {this.plot = new ConvData([],[],false)};
    
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
                this.plot = new ConvData(myResult[1],myResult[0],true);
            },
            error => console.log(error)
        )
        

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