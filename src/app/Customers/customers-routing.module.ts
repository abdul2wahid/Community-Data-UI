import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCustomerComponent } from './view-customer/view-customer.component'
import { EditCustomerComponent } from './edit-customer/edit-customer.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
   
})
export class CustomersRoutingModule { }
