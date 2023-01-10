import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxTypedJsModule } from 'ngx-typed-js';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { GroupsComponent } from './groups/groups.component';
import { GestionGroupComponent } from './gestion-group/gestion-group.component';
import { HttpInterceptorService } from './service/http-interceptor.service';
import { HistoryComponent } from './gestion-group/history/history.component';
import { AlertComponent } from './alert/alert.component';
import { RecapComponent } from './gestion-group/recap/recap.component';
import { CommonModule } from '@angular/common';
import { AccountGestionComponent } from './account-gestion/account-gestion.component';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    RegisterComponent,
    GroupsComponent,
    GestionGroupComponent,
    HistoryComponent,
    AlertComponent,
    RecapComponent,
    AccountGestionComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxTypedJsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }, GestionGroupComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
