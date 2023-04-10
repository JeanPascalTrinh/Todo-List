declare var M: any;
import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  inputValue: string = '';
  isLoading = false;

  addTodoItem(label: any) {
    this.inputValue = label;
    this.todoService
      .createTodo(this.inputValue)
      .subscribe((hasTodoBeenCreated) => {
        if (hasTodoBeenCreated) {
          this.refreshTodos();
        } else {
          alert('Erreur serveur');
        }
      });
  }

  deleteTodoItem(todo: Todo) {
    this.todoService.deleteTodo(todo).subscribe((hasTodoBeenCreated) => {
      if (hasTodoBeenCreated) {
        this.refreshTodos();
      } else {
        alert('Erreur serveur');
      }
    });
  }

  private refreshTodos() {
    this.isLoading = true;
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
      this.isLoading = false;
    });
  }

  notifyUserTodoUpdated(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe((hasTodoBeenUpdated) => {
      if (hasTodoBeenUpdated) {
        M.toast({
          html: `La tâche ${todo.label} a été mise à jour`,
          classes: 'rounded',
        });
        this.refreshTodos();
      } else {
        alert('Erreur serveur');
      }
    });
  }

  /*
  notifyUserTodoFormUpdated(text: string) {
    this.todoService.createTodo(text).subscribe((hasTodoBeenCreated) => {
      if (hasTodoBeenCreated) {
        this.refreshTodos();
      } else {
        alert('Erreur serveur');
      }
    });
  }
  */

  notifyUserDeleted(todo: Todo) {
    this.todoService.deleteTodo(todo).subscribe((hasTodoBeenUpdated) => {
      if (hasTodoBeenUpdated) {
        M.toast({
          html: `La tâche ${todo.label} a été supprimée`,
          classes: 'rounded',
        });
        this.refreshTodos();
      } else {
        alert('Erreur serveur');
      }
    });
  }

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.refreshTodos();
  }
}
