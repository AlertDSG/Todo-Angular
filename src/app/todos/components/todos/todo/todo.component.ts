import { Component, EventEmitter, Input, Output } from '@angular/core'
import { DomainTodo, FilterType } from '../../../models/todos.model'
import { TodosService } from '../../../services/todos.service'

@Component({
  selector: 'tl-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Input() todo!: DomainTodo
  @Output() removeTodoEvent = new EventEmitter<string>()
  @Output() editTodoEvent = new EventEmitter<{ todoId: string; title: string }>()

  constructor(private todosService: TodosService) {}

  isEditMode = false
  title = ''

  removeTodoHandler() {
    this.removeTodoEvent.emit(this.todo.id)
  }

  activateEditeMode() {
    this.title = this.todo.title
    this.isEditMode = true
  }

  editTitleHandler() {
    this.editTodoEvent.emit({ todoId: this.todo.id, title: this.title })
    this.isEditMode = false
  }

  changeFilter(filter: FilterType) {
    this.todosService.changeFilter({ filter: filter, todId: this.todo.id })
  }
}
