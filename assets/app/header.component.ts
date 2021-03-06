import { Component } from '@angular/core';
@Component({
    selector: 'app-header',
    template: `
        <header class="row">
            <nav class="col-md-8 col-md-offset-2">
                 <ul class="nav nav-pills">
                    <li routerLinkActive="active"><a [routerLink]="['/dev']">Local Std Build</a></li>
                    <li routerLinkActive="active"><a [routerLink]="['/testing']">Database Std Build</a></li>
                    <li routerLinkActive="active"><a [routerLink]="['/monitor']">Monitor</a></li>
                 </ul>
            </nav>
        </header>
    `
})
export class HeaderComponent {

}