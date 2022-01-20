import { TodoService } from './../shared/todo.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Todo from '../shared/todo.model';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  constructor(private todoService: TodoService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }
  onFormSubmit(form: NgForm) {
    if (form.invalid) return;
    const todo = new Todo(form.value.text);
    this.todoService.addTodo(todo);
    this.router.navigateByUrl('/todos');

    this.notificationService.show('Created Todo!');

  }

}
