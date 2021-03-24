import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-portfolio';
}

export class LoginLogic {

  user: Login = new Login();
  constructor() {
    this.user = this.getUser();
  }

  public getUser(): Login {
    return JSON.parse(localStorage.getItem("myUser") as string);
  }

  public checkUser(username: string, password: string): boolean {
    if (this.user == null) {
      return false;
    }
    if (this.user.username == username && this.user.password == password) {
      return true;
    }
    return false;
  }

  public getLoginError(username: string, password: string): string {
    if (this.user == null) { return "No user registered"; }
    if (username == "") { return "No username provided"; }
    if (password == "") { return "No password provided"; }
    if (username !== this.user.username) { return "Username is incorrect"; }
    if (password !== this.user.password) { return "Password is incorrect"; }
    return "This should not be reached";
  }
}

export class Login {
  username: string = "";
  password: string = "";
  firstName: string = "";
  lastName: string = "";
}
