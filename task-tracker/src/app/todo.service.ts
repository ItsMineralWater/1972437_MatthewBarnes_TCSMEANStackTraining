import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }
  storeTask(task: any) {
    this.http.post("http://localhost:3000/tasks", task).subscribe(result => console.log(result), error => console.log(error));
  }

  loadTasks(): Observable<Todo[]> {
    return this.http.get<Todo[]>('http://localhost:3000/tasks');
  }
}
