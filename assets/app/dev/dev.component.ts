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
        console.log('onSubmit');
    }
}