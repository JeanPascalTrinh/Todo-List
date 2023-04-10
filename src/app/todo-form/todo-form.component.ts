import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoService } from '../todo.service';
import { Todo } from '../model/todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {
  @Output() todoUpdatedFormEvent = new EventEmitter<string>();
  inputFormValue: string = '';

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.todoUpdatedFormEvent.emit(this.inputFormValue);
    }
  }

  constructor() {}

  ngOnInit() {}
}
