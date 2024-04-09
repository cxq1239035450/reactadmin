export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'purge'
  | 'PURGE'
  | 'link'
  | 'LINK'
  | 'unlink'
  | 'UNLINK'

export type responseType = {
  code: number
  data: Object | null
  message: string
}
export type optionsType = {
  url: string
  method: Method
  headers?: Record<string, string | undefined>
  data?: Object
  params?: Object
}
export type kyOptionsType = {
  url: string
  method: Method
  headers?: Record<string, string | undefined>
  json?: Object
  searchParams?: Object
}
