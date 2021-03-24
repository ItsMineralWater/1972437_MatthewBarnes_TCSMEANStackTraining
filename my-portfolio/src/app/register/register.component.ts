import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginLogic } from '../app.component';

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
  constructor(private router: Router) { }

  ngOnInit(): void { }

  submitRegister() { }

}
