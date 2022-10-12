import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Task } from '../../../../../models/task.model'

@Component({
  selector: 'tl-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task!: Task
  @Output() taskIdEvent = new EventEmitter<string>()

  deleteTask() {
    this.taskIdEvent.emit(this.task.id)
  }
}
