import endpoints from './endpoints'
import type { HTTPMethod } from './methods'

export default class Rest {
  private static baseUrl = 'http://localhost:3009/api/'

  public static async fetch(
    method: HTTPMethod,
    endpoint: string,
    payload?: Record<string, any>
  ): Promise<Record<string, any>> {
    const body = JSON.stringify(payload)
    const option = {
      method,
      headers: {
        'Accept'      : 'application/json',
        'Content-Type': 'application/json'
      }
    } as any
    if (payload)
      option.body = body

    const response = await fetch(
      `${this.baseUrl}${endpoint}`,
      option
    )
    const responseData = await response.json()
    return responseData
  }

  public static async invoke(path: string): Promise<any> {
    // dummy still
    const [
      module,
      actionName
    ] = path.split('.')
    const endpoint = endpoints[module][actionName]
    await this.fetch(endpoint.method, endpoint.url)
  }
}
