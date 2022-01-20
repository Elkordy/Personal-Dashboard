import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import Todo from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService implements OnDestroy {

  todos: Todo[] = []
  storageListSub: Subscription;
  constructor() {
    this.loadState();
    this.storageListSub = fromEvent<StorageEvent>(window, 'storage').subscribe((event: StorageEvent) => {
      if (event.key === 'todos') {
        this.loadState()
      }
    });
  }
  ngOnDestroy(): void {
    this.storageListSub.unsubscribe();
  }

  getTodos() {
    return this.todos;
  }

  getTodo(id: string) {
    return this.todos.find(t => t.id === id);
  }

  addTodo(Todo: Todo) {
    this.todos.push(Todo);
    this.saveState()
  }

  updateTodo(id: string, updatedFields: Partial<Todo>) {
    const todo = this.getTodo(id);
    Object.assign(todo, updatedFields);
    this.saveState()

  }
  deleteTodo(id: string) {
    const todoIndex = this.todos.findIndex(t => t.id === id);
    if (todoIndex == -1) return;
    this.todos.splice(todoIndex, 1);
    this.saveState()

  }

  saveState() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  loadState() {
    try {
      const todosInStorage = JSON.parse(localStorage.getItem('todos') || '{}');
      if (!todosInStorage) return
      this.todos.length = 0
      this.todos.push(...todosInStorage);
    } catch (e) {
      console.log('There was an error retrieveing the todos from localStorage');
      console.log(e);
    }

  }

}


