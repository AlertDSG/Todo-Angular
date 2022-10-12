import { Component, Input, OnInit } from '@angular/core'
import { TasksService } from '../../../../services/tasks.service'
import { map, Observable } from 'rxjs'
import { Task } from '../../../../models/task.model'

@Component({
  selector: 'tl-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  @Input() todoId!: string

  tasks$!: Observable<Task[]>

  taskTitle = ''

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasks$ = this.tasksService.tasksS.pipe(
      map(tasks => {
        return tasks[this.todoId]
      })
    )
    this.tasksService.getTasks(this.todoId)
  }

  addTaskHandler() {
    this.tasksService.addTask({ todoId: this.todoId, title: this.taskTitle })
    this.taskTitle = ''
  }
  removeTask(taskId: string) {
    this.tasksService.removeTask({ todoId: this.todoId, taskId })
  }
}
