export interface IApi<T = void> {
  message: string
  title?: string
  status: number
  data?: T
  meta: {
    status: number
  }
}

/**
 *  error
 */

export interface IApiError {
  status: number
  error: string
  title?: number
  message: string
}