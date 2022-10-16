import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FilterType } from '../../../../models/todos.model'

@Component({
  selector: 'tl-todo-filters',
  templateUrl: './todo-filters.component.html',
  styleUrls: ['./todo-filters.component.scss'],
})
export class TodoFiltersComponent {
  @Input() filter!: FilterType
  @Output() filterEvent = new EventEmitter<FilterType>()

  filterHandler(filter: FilterType) {
    this.filterEvent.emit(filter)
  }
}
