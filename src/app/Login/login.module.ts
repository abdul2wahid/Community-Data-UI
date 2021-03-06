import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';


import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { CalendarModule } from 'primeng/calendar';
import { LoginRoutingModule } from './Login-routing.module';
import { LoginComponent } from './Login.Component';
import { LoginService } from './login.service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../token.interceptor';
import { ShaaredModule } from '../shared/shared.module';
import { SharedService } from '../shared/Shared.Service';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule, LoginRoutingModule, ReactiveFormsModule, CalendarModule, ShaaredModule
  ],
  providers: [
    LoginService, FormBuilder, DatePipe, 
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
})
export class LoginModule { }
