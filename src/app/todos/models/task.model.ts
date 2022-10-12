export interface Task {
  id: string
  todoListId: string
  order: number
  addedDate: string
  title: string
  description: string
  completed: string
  status: number
  priority: number
  startDate: string
  deadline: string
}

export interface GetTasksResponse {
  items: Task[]
  totalCount: number
  error: string
}

export interface DomainTask {
  [key: string]: Task[]
}
