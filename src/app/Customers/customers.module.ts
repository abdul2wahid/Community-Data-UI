import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CalendarModule } from 'primeng/calendar';

import { CustomersRoutingModule } from './customers-routing.module'
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DatePipe } from '@angular/common';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../token.interceptor';


@NgModule({
  declarations: [ViewCustomerComponent, EditCustomerComponent],
  imports: [
    CommonModule, FormsModule, CustomersRoutingModule, TableModule, ButtonModule, DropdownModule, CalendarModule
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
})
export class CustomersModule { }
