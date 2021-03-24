import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { LoginLogic } from '../app.component';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  logger: LoginLogic = new LoginLogic();
  firstName: string = this.logger.user.firstName;
  lastName: string = this.logger.user.lastName;
  tableData: Array<{name:string, number:string}> = new Array();
  contactFormRef = new FormGroup({
    name: new FormControl(),
    number: new FormControl()
  });
  constructor() { }

  ngOnInit(): void {
    this.tableData = JSON.parse(localStorage.getItem("contactTable") as string);
  }

  addContact() {
    if (this.tableData == null) {
      this.tableData = new Array();
    }
    let name1: string = this.contactFormRef.get("name")?.value;
    let number1: string = this.contactFormRef.get("number")?.value;
    this.tableData.push({name: name1, number: number1});
    localStorage.setItem("contactTable", JSON.stringify(this.tableData))
  }

}
