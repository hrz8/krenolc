import { HTTPMethod } from './methods'

export default {
  faq: {
    getAll: {
      method: HTTPMethod.POST,
      url   : 'faq/get-all'
    },
    getDefault: {
      method: HTTPMethod.POST,
      url   : 'faq/get-default'
    }
  }
} as Record<string, Record<string, { method: any, url: string }>>
