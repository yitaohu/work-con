import { NgForm } from "@angular/forms";
import { Component, OnInit } from '@angular/core';


import { FileService } from './file.service';

@Component({
    selector: 'app-file',
    templateUrl: './file.component.html'
})

export class FileComponent{
    constructor(private fileService: FileService) {};
    onSubmit(form: NgForm) {
        this.getTest(form);
        console.log('onSubmit');
    }
    getAllData() {
        this.fileService.getAllFiles()
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

        this.fileService.getTest(qValue)
            .subscribe(
                data => console.log(data),
                error => console.error(error)
            )
    }

}