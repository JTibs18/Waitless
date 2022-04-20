import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CreateMenuComponent } from './create-menu/create-menu.component';
import { AddInfoComponent } from './add-info/add-info.component';
import { HeaderComponent } from './header/header.component';
import { MiniMenuComponent } from './mini-menu/mini-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthInterceptor } from './add-info/auth-interceptor';
import { TableComponent } from './table/table.component';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { OrderComponent } from './order/order.component';
import { PastOrdersComponent } from './past-orders/past-orders.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { DietaryRestrictionsComponent } from './dietary-restrictions/dietary-restrictions.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { TagsComponent } from './tags/tags.component';
import { SuggestedTagsComponent } from './suggested-tags/suggested-tags.component';
import { ConfirmDietaryTagsComponent } from './confirm-dietary-tags/confirm-dietary-tags.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    CreateMenuComponent,
    AddInfoComponent,
    HeaderComponent,
    MiniMenuComponent,
    DashboardComponent,
    SettingsComponent,
    TableComponent,
    ErrorComponent,
    OrderComponent,
    PastOrdersComponent,
    MainMenuComponent,
    DietaryRestrictionsComponent,
    MenuItemComponent,
    OrderSummaryComponent,
    OrderConfirmationComponent,
    TagsComponent,
    SuggestedTagsComponent,
    ConfirmDietaryTagsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
              {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
