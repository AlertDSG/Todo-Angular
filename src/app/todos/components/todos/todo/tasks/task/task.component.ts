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
  @Output() taskUpdateEvent = new EventEmitter<{
    todoId: string
    taskId: string
    model: UpdateTaskModel
  }>()

  isEditMode = false

  title = ''

  taskStatusEnum = TaskStatusEnum

  deleteTask() {
    this.taskIdEvent.emit(this.task.id)
  }

  changeTaskStatusHandler(event: MouseEvent) {
    const newStatus = (event.currentTarget as HTMLInputElement).checked
    this.changeTask({
      status: newStatus ? this.taskStatusEnum.completed : this.taskStatusEnum.active,
    })
  }

  editModeHandler() {
    this.title = this.task.title
    this.isEditMode = true
  }

  changeTaskTitleHandler() {
    this.changeTask({ title: this.title })
    this.isEditMode = false
  }

  changeTask(patch: Partial<UpdateTaskModel>) {
    const model: UpdateTaskModel = {
      status: this.task.status,
      title: this.task.title,
      completed: this.task.completed,
      deadline: this.task.deadline,
      description: this.task.description,
      priority: this.task.priority,
      startDate: this.task.startDate,
      ...patch,
    }
    this.taskUpdateEvent.emit({ todoId: this.task.todoListId, taskId: this.task.id, model })
  }
}
