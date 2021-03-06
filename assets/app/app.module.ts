import { routing } from './app.routing';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { TestingComponent } from "./testing/testing.component";
import { DevComponent } from './dev/dev.component';
import { HeaderComponent } from './header.component';
import { ChartsModule} from 'ng2-charts';
import { PlotComponent } from "./plot/plot.component";
import { ResidualComponent } from "./residual/residual.component";
import { MonitorComponent } from "./monitor/monitor.component";
import { ErrorComponent } from "./errors/error.component";
import { ErrorService } from "./errors/error.service";

@NgModule({
    declarations: [
        AppComponent,
        TestingComponent,
        DevComponent,
        HeaderComponent,
        PlotComponent,
        ResidualComponent,
        MonitorComponent,
        ErrorComponent
    ],
    imports: [
        BrowserModule,
        HttpModule, 
        FormsModule, 
        routing,
        ChartsModule,
    ],
    providers: [ErrorService],
    bootstrap: [AppComponent]
})
export class AppModule {
    
    
}