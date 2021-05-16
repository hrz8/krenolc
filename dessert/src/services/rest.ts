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

export default async (
  method: HTTPMethod,
  endpoint: string,
  payload?: Record<string, any>
): Promise<Record<string, any>> => {
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

  const response = await fetch(`http://localhost:3009/api/${endpoint}`, option)
  const responseData = await response.json()
  return responseData
}