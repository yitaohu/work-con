import { routing } from './app.routing';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { TestingComponent } from "./testing/testing.component";
import { DevComponent } from './dev/dev.component';
import { HeaderComponent } from './header.component';



@NgModule({
    declarations: [
        AppComponent,
        TestingComponent,
        DevComponent,
        HeaderComponent
    ],
    imports: [BrowserModule,HttpModule, FormsModule, routing],
    bootstrap: [AppComponent]
})
export class AppModule {
    
    
}