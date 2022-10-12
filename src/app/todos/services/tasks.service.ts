import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { BehaviorSubject, map } from 'rxjs'
import { DomainTask, GetTasksResponse, Task } from '../models/task.model'
import { CommonResponse } from '../../core/models/core.model'

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasksS = new BehaviorSubject<DomainTask>({})

  constructor(private http: HttpClient) {}

  getTasks(todoId: string) {
    this.http
      .get<GetTasksResponse>(`${environment.baseUrl}/todo-lists/${todoId}/tasks`)
      .pipe(
        map(res => {
          return res.items
        })
      )
      .subscribe(tasks => {
        const stateTasks = this.tasksS.getValue()
        stateTasks[todoId] = tasks
        this.tasksS.next(stateTasks)
      })
  }

  addTask(data: { todoId: string; title: string }) {
    this.http
      .post<CommonResponse<{ item: Task }>>(
        `${environment.baseUrl}/todo-lists/${data.todoId}/tasks`,
        {
          title: data.title,
        }
      )
      .pipe(
        map(res => {
          const stateTasks = this.tasksS.getValue()
          const newTask = res.data.item
          stateTasks[data.todoId] = [newTask, ...stateTasks[data.todoId]]
          return stateTasks
        })
      )
      .subscribe(tasks => {
        this.tasksS.next(tasks)
      })
  }
}
