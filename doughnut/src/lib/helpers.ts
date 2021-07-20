import cookie from 'cookie'

export const promiseWrapper = async <T>(
  promise: (...args) => Promise<T>,
  ...args: any[]
): Promise<(null | T)[]> => {
  try {
    const data = await promise(...args)
    return [
      data,
      null
    ]
  } catch (error) {
    return [
      null,
      error
    ]
  }
}

export const setCookie = (name: string, value: any, days = 7): string => {
  const cookies = cookie.serialize(name, String(value), {
    httpOnly: true,
    maxAge  : 60 * 60 * 24 * days,
    expires : new Date(new Date()
      .getTime() + days * 24 * 60 * 60 * 1000)
  })
  document.cookie = cookies
  return cookies
}

export const getCookie = (name:string): string => {
  const cookies = cookie.parse(document.cookie || '')
  const result = cookies[name]
  return result
}
