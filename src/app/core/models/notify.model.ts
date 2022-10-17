export type Severity = 'success' | 'error' | 'info'

export interface Notify {
  message: string
  severity: Severity
}
