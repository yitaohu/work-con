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
        // var myTestsArray = myTestString.replace(/\n|\s/g,',').split(",")
        this.devService.getAllConvNum(myTestString, myPath1, myPath2)
        .subscribe(
            data => {
                // console.log(data);
                var myResult= this.dataProcess(data);
                this.plot = new ConvData(myResult[1],myResult[0],true);
                console.log(myResult);
            },
            error => console.log(error)
        )
        

    }

    dataProcess(data:Object[]) {
        var testName = [];
        var convNum = [];
        var sortable = [];
        for (var testItem in data) {
            sortable.push([testItem, data[testItem]]);
        }
        
        sortable.sort(function(a, b) {
            return b[1] - a[1];
        });
        sortable.forEach(function(Element) {
            testName.push(Element[0]);
            convNum.push(Element[1]);
        })
        console.log("+++++sortable+++++++");
        console.log(sortable);


        
        return [testName,convNum];
    }
    
}