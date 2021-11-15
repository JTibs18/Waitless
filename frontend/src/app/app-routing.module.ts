import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CreateMenuComponent } from './create-menu/create-menu.component';
import { AddInfoComponent } from './add-info/add-info.component';
import { MiniMenuComponent } from './mini-menu/mini-menu.component';


const routes: Routes = [
  // {path: '', component: },
  // {path: 'Waitless', component: LoginComponent, pathMatch: 'full'},
  // {path: 'Registration', component: RegistrationComponent, pathMatch: 'full'},
  // {path: 'Create_Menu', component: CreateMenuComponent, pathMatch: 'full'}
  {path: 'Waitless', component: LoginComponent, pathMatch: 'full'},
  {path: 'Waitless/Registration', component: RegistrationComponent, pathMatch: 'full'},
  {path: 'Waitless/Create_Menu', component: CreateMenuComponent, pathMatch: 'full'},
  {path: 'Waitless/Create_Menu/Edit/:itemId', component: CreateMenuComponent, pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
