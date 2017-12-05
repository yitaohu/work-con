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
        let testName= testForm.value.testname;
        let beginTime= testForm.value.begintime;
        let endTime= testForm.value.endtime;
        console.log(beginTime);
        console.log(endTime);
        let qValue=[testName, beginTime, endTime]

        this.testingService.getTest(qValue)
            .subscribe(
                data => console.log(data),
                error => console.error(error)
            )
    }

}