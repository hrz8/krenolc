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