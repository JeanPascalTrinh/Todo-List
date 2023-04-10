import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CreateTodo, Todo, TodoResponse, UpdateTodo } from './model/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private httpClient: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.httpClient
      .get<TodoResponse>(
        'https://europe-west1-cours-angular-263913.cloudfunctions.net/todoapp/todo?delay=2000'
      )
      .pipe(map((todoResponse) => todoResponse.todos));
  }

  createTodo(label: string): Observable<boolean> {
    let data: CreateTodo = {
      label: label,
    };
    return this.httpClient
      .post<Todo>(
        ' https://europe-west1-cours-angular-263913.cloudfunctions.net/todoapp/todo',
        data
      )
      .pipe(
        map((todo) => true),
        catchError((err) => of(false))
      );
  }

  updateTodo(todo: Todo): Observable<boolean> {
    let data: UpdateTodo = {
      label: todo.label,
      done: todo.done,
    };
    return this.httpClient
      .put<Todo>(
        ' https://europe-west1-cours-angular-263913.cloudfunctions.net/todoapp/todo/' +
          todo.id,
        data
      )
      .pipe(
        map((todo) => true),
        catchError((err) => of(false))
      );
  }

  deleteTodo(todo: Todo): Observable<boolean> {
    return this.httpClient
      .delete<boolean>(
        ' https://europe-west1-cours-angular-263913.cloudfunctions.net/todoapp/todo/' +
          todo.id
      )
      .pipe(
        map((resp) => true),
        catchError((err) => of(false))
      );
  }
}
