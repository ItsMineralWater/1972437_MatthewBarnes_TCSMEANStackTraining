import { Injectable, OnInit } from '@angular/core';
import { TestQuestion } from './test-question.model';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestQuestionService{

  constructor(private http: HttpClient) { }

  loadEmployeeDetails():Observable<TestQuestion[]> {
    return this.http.get<TestQuestion[]>('/assets/test-sheet.json');
  }
}
