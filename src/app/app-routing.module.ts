import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserTableComponent} from './user/user-table/user-table.component';
import {UserSetupComponent} from './user/user-setup/user-setup.component';


const routes: Routes = [
  {path: '', component: UserTableComponent},
  { path: 'user/:id', component: UserSetupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
