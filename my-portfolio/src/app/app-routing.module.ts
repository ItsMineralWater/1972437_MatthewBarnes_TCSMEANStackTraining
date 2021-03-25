import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MyAuthGuard } from './myauthguard';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "dashboard", component: PortfolioComponent, canActivate:[MyAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
