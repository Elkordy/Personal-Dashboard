import { NotificationService } from './../shared/notification.service';
import { BookmarkService } from './../shared/bookmark.service';
import { TodoService } from './../shared/todo.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Todo from '../shared/todo.model';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {
  todo: Todo;
  constructor(private router: Router, private route: ActivatedRoute, private todoService: TodoService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((ParamMap: ParamMap) => {
      let idParam = ParamMap.get('id')!;
      this.todo = this.todoService.getTodo(idParam)!;
      console.log(idParam, this.todo)
    })
  }
  onFormSubmit(form: NgForm) {
    if (form.invalid) return;
    this.todoService.updateTodo(this.todo.id, form.value)
    this.router.navigateByUrl('/todos');
    this.notificationService.show('Todo Edited!');

  }
}
