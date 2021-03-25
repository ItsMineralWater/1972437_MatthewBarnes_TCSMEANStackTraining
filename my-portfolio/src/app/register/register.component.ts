import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginLogic } from '../loginlogic.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  msg: string = "";
  registerFormRef = new FormGroup({
    user: new FormControl(),
    pass: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl()
  });
  constructor(private router: Router, private logger: LoginLogic) { }

  ngOnInit(): void { }

  submitRegister() {
    let user1: string = this.registerFormRef.get("user")?.value;
    let pass1: string = this.registerFormRef.get("pass")?.value;
    let fname: string = this.registerFormRef.get("firstName")?.value;
    let lname: string = this.registerFormRef.get("lastName")?.value;
    if (this.logger.registerUser(user1, pass1, fname, lname)) {
      this.router.navigate(["/login"]);
    }
  }

}
