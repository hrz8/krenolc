import log from '../utils/logger'

type EndpointObject<TEndpoint> = { [key: string]: TEndpoint[keyof TEndpoint] }

export const extractEndpoint = <T>(Endpoint: T): EndpointObject<T> => Reflect
  .ownKeys(
    Object.getPrototypeOf(Endpoint)
  )
  .filter((ep): boolean => ep !== 'constructor')
  .map((ep): EndpointObject<T> => {
    const key = ep.toString()
    const method = Endpoint[key as keyof T]
    const boundedMethod = (method as any).bind(Endpoint)
    return {
      [key]: boundedMethod
    }
  })
  .reduce((obj, item): EndpointObject<T> => {
    const key = Object.keys(item)[0]
    return {
      ...obj,
      [key]: item[key]
    }
  }, {} as EndpointObject<T>)

export const sayHello = (): void => log.info('Hello darkness my old friend')
