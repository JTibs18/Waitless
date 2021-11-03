import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './login/login.component';
import { RegistrationComponent} from './registration/registration.component';
import { CreateMenuComponent} from './create-menu/create-menu.component';


const routes: Routes = [
  {path: 'Waitless', component: LoginComponent, pathMatch: 'full'},
  {path: 'Registration', component: RegistrationComponent, pathMatch: 'full'},
  {path: 'Create_menu', component: CreateMenuComponent, pathMatch: 'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
