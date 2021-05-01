import _toString from 'lodash/toString'
import _isObjectLike from 'lodash/isObjectLike'
import _snakeCase from 'lodash/snakeCase'
import { getEnv } from '../env'

export class ErrorCode {
  static get namespace(): string {
    const brain = getEnv<string>('BRAIN', 'KRY')
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
    message: string,
    data: any
  }

  constructor(data = {}, status: number, message: string, errorCode: string, apiVersion?: string) {
    this.status = _toString(status) || '500'
    this.apiVersion = apiVersion || 'unknown'
    this.error = {
      code   : errorCode,
      message: message || 'Internal Server Error',
      data   : _isObjectLike(data) ? data : {}
    }
  }
}
