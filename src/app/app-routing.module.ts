import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataComponent } from './Form/data/data.component';
import { DatapageComponent } from './Form/datapage/datapage.component';
import { IncomeformComponent } from './Form/incomeform/incomeform.component';
import { UserformComponent } from './Form/userform/userform.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './Form/signup/signup.component';
import { LoginComponent } from './Form/login/login.component';

const routes: Routes = [
  {path:'userform', component:UserformComponent},
  {path:'incomeform', component:IncomeformComponent},
  {path:'datapage', component:DatapageComponent},
  {path:'data', component:DataComponent},
  {path:'home',component:HomeComponent},
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'',redirectTo:'userform,home,datapage',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
