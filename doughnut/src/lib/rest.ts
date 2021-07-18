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

export type RestResponse<T> = {
  status: string;
  apiVersion: string;
  data: T;
  meta: Record<string, any>;
  message: string
}

export const endpoints = {
  auth: {
    login: {
      method: HTTPMethod.POST,
      url   : 'auth/login'
    }
  }
} as Record<string, Record<string, { method: any, url: string }>>

export class Rest {
  private static baseUrl = import.meta.env.VITE_MODULE_URL

  public static async hit<T>(
    method: HTTPMethod,
    endpoint: string,
    data?: { payload?: Record<string, any>; token?: string }
  ): Promise<RestResponse<T>> {
    const option = {
      method,
      headers: {
        'Accept'      : 'application/json',
        'Content-Type': 'application/json'
      }
    } as any
    if (data?.payload)
      option.body = JSON.stringify(data.payload)

    if (data?.token)
      option.headers['Authorization'] = `Bearer ${data.token}`

    const response = await fetch(
      `${this.baseUrl}${endpoint}`,
      option
    )
    const responseData = await response.json()
    return responseData
  }

  public static async invoke<T>(
    path: string,
    payload?: { payload?: Record<string, any>; token?: string }
  ): Promise<RestResponse<T>> {
    const [
      module,
      actionName
    ] = path.split('.')
    const endpoint = endpoints[module][actionName]
    const result = await this.hit<T>(endpoint.method, endpoint.url, payload)
    return result
  }
}
