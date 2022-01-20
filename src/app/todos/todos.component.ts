import { NotificationService } from './../shared/notification.service';
import { TodoService } from './../shared/todo.service';
import { Component, OnInit } from '@angular/core';
import Todo from '../shared/todo.model';
import { Router } from '@angular/router';
import { transition, trigger, animate, style } from '@angular/animations';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  animations: [
    trigger('todoItemAnim', [
      transition(':leave', [
        animate(200, style({
          opacity: '0',
          height: '0',
          marginBottom: '0'
        }))
      ])
    ])
  ]
})
export class TodosComponent implements OnInit {
  todos: Todo[]

  constructor(private todosService: TodoService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {

    this.todos = this.todosService.getTodos()
  }

  toggleCompleted(todo: Todo) {
    this.todosService.updateTodo(todo.id, { completed: !todo.completed })
  }
  onEditClick(todo: Todo) {
    this.router.navigate(['/todos', todo.id]);
  }
  onDeleteClick(todo: Todo) {
    this.todosService.deleteTodo(todo.id);
    this.notificationService.show('Todo Deleted!')
  }
  trackById(item: any) {
    return item.id
  }
}
