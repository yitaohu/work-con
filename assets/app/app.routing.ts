import { Routes, RouterModule } from '@angular/router';
import { TestingComponent } from './testing/testing.component';
import { DevComponent } from './dev/dev.component';
import { ResidualComponent } from './residual/residual.component';
import { MonitorComponent } from "./monitor/monitor.component";
const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/dev', pathMatch: 'full'},
    {path: 'testing', component: TestingComponent},
    {path: 'dev', component: DevComponent},
    {path: 'monitor', component: MonitorComponent},
    {path: 'residual/:testName/:journalName/:outUrl1/:outUrl2', component: ResidualComponent}

]

export const routing=RouterModule.forRoot(APP_ROUTES);