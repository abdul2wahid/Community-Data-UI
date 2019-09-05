import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


import { LoginRoutingModule } from './Login-routing.module';
import { LoginComponent } from './Login.Component';
import { LoginService } from './login.service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../token.interceptor';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule, LoginRoutingModule, HttpClientModule, ReactiveFormsModule
  ],
  providers: [
    LoginService, FormBuilder, DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
})
export class LoginModule { }
