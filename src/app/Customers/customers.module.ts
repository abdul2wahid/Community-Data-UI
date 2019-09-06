import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { CustomersRoutingModule } from './customers-routing.module'
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [ViewCustomerComponent],
  imports: [
    CommonModule, CustomersRoutingModule, TableModule, 
  ]
})
export class CustomersModule { }
