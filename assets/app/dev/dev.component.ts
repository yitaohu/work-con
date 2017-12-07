import { NgForm } from "@angular/forms";
import { Component, OnInit } from '@angular/core';


import { DevService } from './dev.service';

@Component({
    selector: 'app-dev',
    templateUrl: './dev.component.html'
})

export class DevComponent{
    constructor(private devService: DevService) {};
    onSubmit(form: NgForm) {
        var myTestString = form.value.testname;
        var myPath1 = form.value.run1;
        var myPath2 = form.value.run2; 
        var myTestsArray = myTestString.split(",")
        this.getAllConvNum(myTestsArray,myPath1);
    }

    getAllConvNum(TestsArray,myPath) {
        this.devService.getAllConvNum(TestsArray, myPath)
            .subscribe(
                data => console.log(data),
                error => console.error(error)
            )
    }
}