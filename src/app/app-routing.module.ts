import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './component/register/register.component';
import { ViewUserComponent } from './component/view-user/view-user.component';
import { ViewComponent } from './component/view/view.component';
import { LayoutComponent } from './layout/layout/layout.component';


const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [{
    path : '',
    component: RegisterComponent
  },{
    path: 'view',
    component: ViewComponent
  },{
    path: 'edit',
    component: RegisterComponent
  },{
    path: 'view-user',
    component: ViewUserComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
