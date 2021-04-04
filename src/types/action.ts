/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { Request } from 'express'
import { EndpointAction } from './endpoint'

export enum HTTPMethod {
  CONNECT = 'CONNECT',
  DELETE = 'DELETE',
  GET = 'GET',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
  TRACE = 'TRACE'
}

export interface Context {
  params: {
    query: any,
    body: any,
    headers: any
  },
  baseUrl: string,
  action: EndpointAction,
  method: HTTPMethod,
  request: Request
}
