import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCustomerComponent } from './view-customer/view-customer.component'
import { DetailcustomerComponent } from './detailcustomer/detailcustomer.component';

const routes: Routes = [

 
  {
    path: '',
    children: [
      {
        path: '',
        component: ViewCustomerComponent,
      },
      {
        path: 'details/:id',
      component: DetailcustomerComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
   
})
export class CustomersRoutingModule { }
