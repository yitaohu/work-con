import { Component } from '@angular/core';
import {TestingService} from "./testing/testing.service";
import { DevService } from './dev/dev.service';
import { MonitorService } from './monitor/monitor.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [TestingService, DevService, MonitorService],
})
export class AppComponent {
    

}