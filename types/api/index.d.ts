import { IApiProfile } from './profile'

export interface IApi<T = void> {
  message: string
  status: number
  data?: T
}

export interface IApiLanding {
  profile: IApiProfile
}

export interface IPayloadPagination {
  page: number
  limit: number
  q: string
}
export interface IApiPagination {
  page: number
  limit: number
  itemCount: number
  hasNextPage: boolean
  total: number
  totalPage: number
}

export interface IApiActionParams {
  onSuccess?: () => void
  onError?: () => void
}

export interface IApiDetailParams {
  id: string | number
  enabled?: boolean
}
