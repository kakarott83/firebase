import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CreateCustomerComponent } from './customers/create-customer/create-customer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerfifyEmailComponent } from './verfify-email/verfify-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { InnerPageSecureGuard } from './guard/inner-page-secure.guard';


const routes: Routes = [
  { path: '', redirectTo: 'customers', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, canActivate: [InnerPageSecureGuard]},
  { path: 'register', component: RegisterComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'verify-email', component: VerfifyEmailComponent, canActivate: [InnerPageSecureGuard]},
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [InnerPageSecureGuard]},
  { path: 'customers', component: CustomerListComponent, canActivate: [InnerPageSecureGuard]},
  { path: 'add', component: CreateCustomerComponent, canActivate: [InnerPageSecureGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
