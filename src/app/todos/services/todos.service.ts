import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { BehaviorSubject, map } from 'rxjs'
import { DomainTodo, FilterType, Todo } from '../models/todos.model'
import { CommonResponse } from '../../core/models/core.model'

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos$ = new BehaviorSubject<DomainTodo[]>([])
  constructor(private http: HttpClient) {}

  getTodos() {
    this.http
      .get<Todo[]>(`${environment.baseUrl}/todo-lists`)
      .pipe(
        map(todos => {
          const newTodos: DomainTodo[] = todos.map(todo => ({ ...todo, filter: 'all' }))
          return newTodos
        })
      )
      .subscribe(todos => {
        this.todos$.next(todos)
      })
  }

  addTodo(title: string) {
    this.http
      .post<CommonResponse<{ item: Todo }>>(`${environment.baseUrl}/todo-lists`, { title })
      .pipe(
        map(res => {
          const stateTodos = this.todos$.getValue()
          const newTodo: DomainTodo = { ...res.data.item, filter: 'all' }
          return [newTodo, ...stateTodos]
        })
      )
      .subscribe(todos => {
        this.todos$.next(todos)
      })
  }

  removeTodo(todoId: string) {
    this.http
      .delete<CommonResponse>(`${environment.baseUrl}/todo-lists/${todoId}`)
      .pipe(
        map(() => {
          return this.todos$.getValue().filter(todo => todo.id !== todoId)
        })
      )
      .subscribe(todos => {
        this.todos$.next(todos)
      })
  }
  updateTodoTitle(data: { todoId: string; title: string }) {
    this.http
      .put<CommonResponse>(`${environment.baseUrl}/todo-lists/${data.todoId}`, {
        title: data.title,
      })
      .pipe(
        map(() => {
          return this.todos$
            .getValue()
            .map(todo => (todo.id === data.todoId ? { ...todo, title: data.title } : todo))
        })
      )
      .subscribe(todos => {
        this.todos$.next(todos)
      })
  }
  changeFilter(data: { filter: FilterType; todId: string }) {
    const todos = this.todos$
      .getValue()
      .map(todo => (todo.id === data.todId ? { ...todo, filter: data.filter } : todo))
    this.todos$.next(todos)
  }
}
