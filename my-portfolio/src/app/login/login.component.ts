import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginLogic } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msg: string = "";
  logger: LoginLogic = new LoginLogic();
  loginFormRef = new FormGroup({
    user: new FormControl(),
    pass: new FormControl()
  });

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.logger = new LoginLogic();
  }

  submitLogin(): void {
    let user1: string = this.loginFormRef.get("user")?.value;
    let pass1: string = this.loginFormRef.get("pass")?.value;
    if (this.logger.checkUser(user1, pass1)) {
      this.router.navigate(["dashboard"]);
    } else {
      this.msg = this.logger.getLoginError(user1, pass1);
    }

  }

}
