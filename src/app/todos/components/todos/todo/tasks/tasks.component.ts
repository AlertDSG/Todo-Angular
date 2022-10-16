import { Component, Input, OnInit } from '@angular/core'
import { TasksService } from '../../../../services/tasks.service'
import { combineLatest, map, Observable } from 'rxjs'
import { Task, UpdateTaskModel } from '../../../../models/task.model'
import { FilterType } from '../../../../models/todos.model'
import { TodosService } from '../../../../services/todos.service'
import { TaskStatusEnum } from '../../../../../core/enums/taskStatus.enum'

@Component({
  selector: 'tl-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  @Input() todoId!: string
  @Input() filter!: FilterType

  tasks$!: Observable<Task[]>

  taskTitle = ''

  constructor(private tasksService: TasksService, private todosService: TodosService) {}

  ngOnInit(): void {
    this.tasks$ = combineLatest([this.tasksService.tasks$, this.todosService.todos$]).pipe(
      map(res => {
        let tasks = res[0][this.todoId]
        const activeTodo = res[1].find(tl => tl.id === this.todoId)
        if (activeTodo?.filter === 'completed') {
          tasks = tasks.filter(t => t.status === TaskStatusEnum.completed)
        }
        if (activeTodo?.filter === 'active') {
          tasks = tasks.filter(t => t.status === TaskStatusEnum.active)
        }
        return tasks
      })
    )
    console.log(this.tasks$)
    this.tasksService.getTasks(this.todoId)
  }

  addTaskHandler() {
    this.tasksService.addTask({ todoId: this.todoId, title: this.taskTitle })
    this.taskTitle = ''
  }
  removeTask(taskId: string) {
    this.tasksService.removeTask({ todoId: this.todoId, taskId })
  }

  changeStatusTask(data: { todoId: string; taskId: string; model: UpdateTaskModel }) {
    this.tasksService.updateTask(data)
  }
}
