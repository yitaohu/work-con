import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { FileComponent } from "./file/file.component";
import { DevComponent } from './dev/dev.component';


@NgModule({
    declarations: [
        AppComponent,
        FileComponent,
        DevComponent
    ],
    imports: [BrowserModule,HttpModule, FormsModule],
    bootstrap: [AppComponent]
})
export class AppModule {
    
    
}