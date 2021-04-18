import errors, { HttpStatusError } from 'common-errors'
import _ from 'lodash'

const KrenolcError = errors.helpers.generateClass('KrenolcError', {
  extends: HttpStatusError as any,
  args   : [
    'status',
    'apiVersion',
    'error'
  ]
})

export class ErrorCode {
  static get prefix(): string {
    const namespace = (process.env.BRAIN || 'KRY')
      .replace(/[^0-9a-z]/gi, '')
    return `${namespace}-${this.name}`
      .toUpperCase()
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
    this.status = _.toString(status) || '500'
    this.apiVersion = apiVersion || 'unknown'
    this.error = {
      code   : errorCode,
      message: message || 'Internal Server Error',
      data   : _.isObjectLike(data) ? data : {}
    }
  }

  public throw(): Error {
    throw new KrenolcError(
      this.status,
      this.apiVersion,
      this.error
    )
  }
}
