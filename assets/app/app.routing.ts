import { Routes, RouterModule } from '@angular/router';
import { TestingComponent } from './testing/testing.component';
import { DevComponent } from './dev/dev.component';
import { ResidualComponent } from './residual/residual.component';
const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/dev', pathMatch: 'full'},
    {path: 'testing', component: TestingComponent},
    {path: 'dev', component: DevComponent},
    {path: 'residual/:testname/:jounalname', component: ResidualComponent}

]

export const routing=RouterModule.forRoot(APP_ROUTES);