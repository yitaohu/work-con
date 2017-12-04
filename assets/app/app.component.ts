import { Component } from '@angular/core';
import {FileService} from "./file/file.service";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [FileService],
})
export class AppComponent {
    

}