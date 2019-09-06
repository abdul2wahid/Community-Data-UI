import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginModule } from './Login/Login.module';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./Login/login.module').then(mod => mod.LoginModule)
  },
 {
   path: 'customers',
   loadChildren: () => import('./Customers/customers.module').then(mod => mod.CustomersModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
