import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestPageComponent } from './test-page/test-page.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path: "", component: WelcomeComponent},
  {path: "test", component: TestPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
