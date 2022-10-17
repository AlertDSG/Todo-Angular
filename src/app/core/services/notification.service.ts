import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Notify } from '../models/notify.model'

@Injectable()
export class NotificationService {
  notify$ = new BehaviorSubject<null | Notify>(null)

  handleError(message: string) {
    this.notify$.next({ message, severity: 'error' })
    setTimeout(this.clear.bind(this), 5000)
  }

  handleSuccess(message: string) {
    this.notify$.next({ message, severity: 'success' })
  }

  clear() {
    this.notify$.next(null)
  }
}
