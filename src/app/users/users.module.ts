import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ViewUsersComponent } from './view-users/view-users.component';
import { UsersRoutingModule } from './users-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../token.interceptor';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ViewUsersComponent],
  imports: [
    CommonModule, UsersRoutingModule, TableModule, ButtonModule, ReactiveFormsModule,
    FormsModule, CalendarModule
  ], providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
})
export class UsersModule { }
