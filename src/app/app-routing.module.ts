import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginModule } from './Login/Login.module';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./Login/login.module').then(mod => mod.LoginModule)
  },
 {
   path: 'users',
   loadChildren: () => import('./Customers/customers.module').then(mod => mod.CustomersModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./users/users.module').then(mod => mod.UsersModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
