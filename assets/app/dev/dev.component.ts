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
        var myPath = form.value.run1;
        console.log(myPath);
        this.getConvNum(myPath);
        console.log('onSubmit');
    }

    getConvNum(myPath) {
        this.devService.getConvNum(myPath)
            .subscribe(
                data => console.log(data),
                error => console.error(error)
            )
    }
}