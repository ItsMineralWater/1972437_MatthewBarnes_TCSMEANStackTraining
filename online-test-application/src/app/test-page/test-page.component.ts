import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { $ } from 'protractor';
import { TestQuestion } from '../test-question.model';
import { TestQuestionService } from '../test-question.service';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit {

  myForm = new FormGroup({});
  public questions: Array<TestQuestion> = [];
  constructor(public testSer: TestQuestionService) { }
  displayed: string = "none";
  scoreString: string = "";
  testPassedString: string = "";
  myAnswers: Array<number> = new Array();

  ngOnInit(): void {

    this.testSer.loadEmployeeDetails().subscribe(data => {
      this.questions = data;
      for (let i in this.questions) {
        this.myForm.addControl(this.questions[i].question, new FormControl())
      }
    });


  }

  onSubmit(values: object) {
    console.log(Object.values(values));
    this.myAnswers = Object.values(values);
    this.checkAnswers(this.myAnswers);
    this.displayed = "block";
  }

  checkAnswers(values: object) {
    let correctAnswers: number = 0;
    let myAnswers = Object.values(values);
    for (let i in myAnswers) {
      if (myAnswers[i] !== null && parseInt(myAnswers[i]) == this.questions[i].key) {


        correctAnswers++;

      }
    }
    this.scoreString = correctAnswers + "/" + myAnswers.length;
    this.testPassedString = ((correctAnswers >= 7) ? "passed!" : "failed.");
  }

  closeModal() {
    this.displayed = "none";
  }

  getQuestionResults(q: TestQuestion): string {
    let i = this.questions.indexOf(q);
    if (this.myAnswers[i]) {
      if (this.myAnswers[i] == q.key) {
        return `Question ${i+1}: correct.`
      } else {
        return `Question ${i+1}: incorrect.`
      }
    } else { return `Question ${i+1}: not answered.`}
  }

}
