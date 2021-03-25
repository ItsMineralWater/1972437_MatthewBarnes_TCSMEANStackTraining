import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginLogic } from '../loginlogic.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msg: string = "";
  loginFormRef = new FormGroup({
    user: new FormControl(),
    pass: new FormControl()
  });

  constructor(private router: Router, private logger: LoginLogic) { }

  ngOnInit(): void { }

  submitLogin(): void {
    let user1: string = this.loginFormRef.get("user")?.value;
    let pass1: string = this.loginFormRef.get("pass")?.value;
    if (this.logger.checkLogin(user1, pass1)) {
      this.logger.logIn();
      this.router.navigate(["dashboard"]);
    } else {
      this.msg = this.logger.getLoginError(user1, pass1);
    }

  }

}
