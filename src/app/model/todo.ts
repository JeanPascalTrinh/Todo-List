export interface Todo {
  label: string;
  done: boolean;
  id: number;
  creationDate: number;
}

export interface TodoResponse {
  todos: Todo[];
}

export interface CreateTodo {
  label: string;
}

export interface UpdateTodo {
  label: string;
  done: boolean;
}
