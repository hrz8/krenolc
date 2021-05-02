import _toString from 'lodash/toString'
import _isObjectLike from 'lodash/isObjectLike'
import _snakeCase from 'lodash/snakeCase'
import _camelCase from 'lodash/camelCase'
import EnvFactory from '../env'

type ErrorPayload = {
  reponseMessage?: string
  apiVersion?: string,
  module?: string,
  endpoint?: string
}

export class ErrorCode {
  static get namespace(): string {
    const brain = EnvFactory.get<string>('BRAIN', 'KRY')
      .replace(/[^0-9a-z]/gi, '')
    return brain.toUpperCase()
  }

  static get codedName(): string {
    return `${_snakeCase(this.name)}`
      .toUpperCase()
  }

  static get prefix(): string {
    return `${this.namespace}-${(this.codedName)}`
  }
}

export class ErrorResponse {
  public status: string

  public apiVersion: string

  public error: {
    code: string,
    name: string | undefined,
    message: string,
    data: any
  }

  public message: string

  constructor(
    { name, ...data }: { name?: string, [key: string]: any } = {
      name: undefined
    },
    status: number,
    errMessage: string,
    errorCode: string,
    {
      reponseMessage = '',
      apiVersion,
      module,
      endpoint
    }: ErrorPayload = {} as ErrorPayload
  ) {
    this.status = _toString(status) || '500'
    this.apiVersion = apiVersion || 'unknown'
    this.error = {
      code   : errorCode,
      name,
      message: errMessage || 'Internal Server Error',
      data   : _isObjectLike(data) ? data : {}
    }
    this.message = reponseMessage || (module && endpoint ? `fail ${module} ${_camelCase(endpoint)}` : errMessage)
  }
}
