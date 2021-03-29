import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'task-tracker';

  constructor(public todoSer: TodoService) { }
  tasks: Array<Todo> = new Array();

  ngOnInit() {
    this.todoSer.loadTasks().subscribe(data => {
      this.tasks = data;
    });
  }

  formRef = new FormGroup({
    empId: new FormControl(),
    name: new FormControl(),
    task: new FormControl(),
    deadline: new FormControl()
  })

  addTodo(formValue: object) {
    console.log(formValue);
    this.todoSer.storeTask(formValue);
  }
}
