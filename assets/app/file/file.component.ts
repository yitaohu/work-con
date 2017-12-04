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
        this.fileService.getTest(testName)
            .subscribe(
                data => console.log(data),
                error => console.error(error)
            )
    }

}