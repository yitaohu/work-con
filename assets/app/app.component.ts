import { Component } from '@angular/core';
import {FileService} from "./file/file.service";
import { DevService } from './dev/dev.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [FileService, DevService],
})
export class AppComponent {
    

}