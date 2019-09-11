import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCustomerComponent } from './view-customer/view-customer.component'
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { ViewCustomerDetailsComponent } from './view-customer-details/view-customer-details.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';

const routes: Routes = [

 
  {
    path: '',
    children: [
      {
        path: '',
        component: ViewCustomerComponent,
      },
      {
        path: 'edit/:id',
        component: EditCustomerComponent,
      },
      {
        path: 'view/:id',
        component: ViewCustomerDetailsComponent,
      },
      {
        path: 'add',
        component: CreateCustomerComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
   
})
export class CustomersRoutingModule { }
