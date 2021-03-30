import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'task-tracker';

  constructor(public todoSer: TodoService) { }
  tasks: Array<Todo> = new Array();

  formRef = new FormGroup({
    empId: new FormControl(),
    name: new FormControl(),
    task: new FormControl(),
    deadline: new FormControl()
  })

  ngOnInit() {
    this.todoSer.loadTasks().subscribe(data => {
      this.tasks = data;
    });
  }

  addTodo(formValue: Todo) {
    this.todoSer.storeTask(formValue);
    this.tasks.push(formValue);
  }
}
