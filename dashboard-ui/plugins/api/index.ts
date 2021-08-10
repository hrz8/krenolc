import qs from 'qs'
import {
  NuxtAppOptions, Plugin
} from '@nuxt/types'
import endpoints, { Endpoint } from './endpoints'

function urlBuilder(this: { params: any; url: string }) {
  if (this.params) {
    return Object.keys(this.params)
      .reduce((url, key) =>
        url.split(`:${key}`)
          .join(this.params[key]),
      this.url
      )
  }
  return this.url
}

async function ajax(this: any, context: any) {
  const response = await this.$axios(context)
  return response.data
}

function caller(app: NuxtAppOptions) {
  return function (this: string, args: Record<string, any>[] = []) {
    const endpoint = this
    const [
      name,
      method
    ] = endpoint.split('.')
    let context: Endpoint & {
      [key: string]: any;
    } = Object.assign({}, endpoints[name][method]);
    [
      'data',
      'params',
      'query',
      'opt'
    ].forEach(v => {
      if (v === 'opt' && typeof args[0]?.opt !== 'undefined') {
        context = {
          ...context,
          ...args[0]?.opt
        }
      } else if (v !== 'opt') {
        context[v] = args[0]?.[v] || null
      }
    })
    context.url = urlBuilder.call(context as any)
    context.params = context.query
    context.paramsSerializer = (params: any) => {
      return qs.stringify(params, {
        encodeValuesOnly: true
      })
    }

    return ajax.apply(app, [
      context,
      endpoints
    ] as any)
  }
}

const ApiPlugin: Plugin = (context, inject) => {
  inject('api', caller(context.app))
}

export default ApiPlugin
