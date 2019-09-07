import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



import { CustomersRoutingModule } from './customers-routing.module'
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

import { DetailcustomerComponent } from './detailcustomer/detailcustomer.component';



@NgModule({
  declarations: [ViewCustomerComponent, DetailcustomerComponent],
  imports: [
    CommonModule, FormsModule,CustomersRoutingModule, TableModule, ButtonModule, DropdownModule
  ]
})
export class CustomersModule { }
