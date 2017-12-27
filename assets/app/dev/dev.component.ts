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
    originalData = [] ;
    constructor(private devService: DevService) {
        this.plot = new ConvData([],[],false), 
        this.originalData = [];
    };
    
    onSubmit(form: NgForm) {
        var myTestString = form.value.testname;
        var myPath1 = form.value.run1;
        var myPath2 = form.value.run2; 
        // var myTestsArray = myTestString.replace(/\n|\s/g,',').split(",")
        this.devService.getAllConvNum(myTestString, myPath1, myPath2)
        .subscribe(
            data => {
                // console.log(data);
                console.log("dev con ");
                console.log(this.originalData);
                var myResult= this.dataProcess(data);
                this.plot = new ConvData(myResult[1],myResult[0],true);
                this.originalData = [myResult[0],myResult[2],myResult[3]];
                console.log("dev component");
                console.log(myResult);
            },
            error => console.log(error)
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
        console.log("+++++sortable+++++++");
        console.log(sortable);


        
        return [testName,convNum,run1conv,run2conv];
    }
    
}