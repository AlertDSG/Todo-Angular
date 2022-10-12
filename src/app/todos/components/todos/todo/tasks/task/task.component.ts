import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Task, UpdateTaskModel } from '../../../../../models/task.model'
import { TaskStatusEnum } from '../../../../../../core/enums/taskStatus.enum'

@Component({
  selector: 'tl-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task!: Task
  @Output() taskIdEvent = new EventEmitter<string>()
  @Output() taskStatusEvent = new EventEmitter<{
    todoId: string
    taskId: string
    model: UpdateTaskModel
  }>()

  taskStatusEnum = TaskStatusEnum

  deleteTask() {
    this.taskIdEvent.emit(this.task.id)
  }

  changeTaskStatusHandler(event: MouseEvent) {
    const newStatus = (event.currentTarget as HTMLInputElement).checked
    this.taskStatusEvent.emit({
      todoId: this.task.todoListId,
      taskId: this.task.id,
      model: {
        status: newStatus ? this.taskStatusEnum.completed : this.taskStatusEnum.active,
        title: this.task.title,
        completed: this.task.completed,
        deadline: this.task.deadline,
        description: this.task.description,
        priority: this.task.priority,
        startDate: this.task.startDate,
      },
    })
  }
}
