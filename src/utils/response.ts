import _ from 'lodash'

export class Response {
  public data: any

  public meta: any

  constructor(data: any, meta = {}) {
    this.data = _.isObjectLike(data) ? data : _.noop()
    this.meta = meta
  }
}

export class SuccessResponse {
  public status: string

  public data: any

  public message: string

  public meta: any

  constructor(data: any, meta = {}, endpointId: string, message?: string) {
    if (!_.isObjectLike(data)) {
      throw new Error('data must be in array or object')
    }

    if (message && !_.isString(message)) {
      throw new Error('message must be a string')
    }

    const module = endpointId.split('-')[0]
    const endpoint = endpointId.substr(module.length + 1)
    this.status = '200'
    this.data = data
    this.meta = meta
    this.message = message || `success ${module} ${_.camelCase(endpoint)}`
  }
}
