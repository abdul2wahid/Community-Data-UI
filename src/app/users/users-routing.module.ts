import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewUsersComponent } from './view-users/view-users.component';

const routes: Routes = [


  {
    path: '',
    children: [
      {
        path: '',
        component: ViewUsersComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]

})
export class UsersRoutingModule { }
