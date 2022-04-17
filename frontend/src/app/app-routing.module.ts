import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CreateMenuComponent } from './create-menu/create-menu.component';
import { AddInfoComponent } from './add-info/add-info.component';
import { MiniMenuComponent } from './mini-menu/mini-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { OrderComponent } from './order/order.component';
import { PastOrdersComponent } from './past-orders/past-orders.component';

import { AuthGuard } from "./add-info/auth.guard";


const routes: Routes = [
  // {path: '', component: },
  // {path: 'Waitless', component: LoginComponent, pathMatch: 'full'},
  // {path: 'Registration', component: RegistrationComponent, pathMatch: 'full'},
  // {path: 'Create_Menu', component: CreateMenuComponent, pathMatch: 'full'}
  {path: '', component: LoginComponent, pathMatch: 'full'},
  {path: 'Waitless', component: LoginComponent, pathMatch: 'full'},
  {path: 'Waitless/Login', component: LoginComponent, pathMatch: 'full'},
  {path: 'Waitless/Registration', component: RegistrationComponent, pathMatch: 'full'},
  {path: 'Waitless/:restaurantName/Create_Menu', component: CreateMenuComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'Waitless/:restaurantName/Create_Menu/Edit/:itemId', component: CreateMenuComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'Waitless/:restaurantName/Edit_Menu', component: CreateMenuComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'Waitless/:restaurantName/Edit_Menu/Edit/:itemId', component: CreateMenuComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'Waitless/:restaurantName/Dashboard', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'Waitless/:restaurantName/Settings', component: SettingsComponent, pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'Waitless/:restaurantName/Dashboard/:orderId', component:OrderComponent , pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'Waitless/:restaurantName/PastOrders', component:PastOrdersComponent , pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'Waitless/:restaurantName/PastOrders/:pastOrderId', component:OrderComponent , pathMatch: 'full', canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
