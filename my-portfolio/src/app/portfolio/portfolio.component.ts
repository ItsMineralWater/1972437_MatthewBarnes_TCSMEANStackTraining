import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginLogic } from '../loginlogic.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  tableData: Array<{name:string, number:string}> = new Array();
  contactFormRef = new FormGroup({
    name: new FormControl(),
    number: new FormControl()
  });

  constructor(private router: Router, public logger: LoginLogic) { }

  ngOnInit(): void {
    this.tableData = JSON.parse(localStorage.getItem("contactTable") as string);
    if (this.tableData == null) {
      this.tableData = new Array();
    }
  }

  addContactPress() {
    let name = this.contactFormRef.get("name")?.value;
    let number = this.contactFormRef.get("number")?.value;
    if (name == null || number == null) {
      return;
    }
    this.tableData.push({name, number});
    localStorage.setItem("contactTable", JSON.stringify(this.tableData))
  }

  onLogoutPress() {
    this.logger.logOut();
    this.router.navigate(["/login"]);
  }

  resetTable() {
    localStorage.removeItem("contactTable");
    this.tableData = new Array();
  }
}
