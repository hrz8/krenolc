import { NextFunction } from 'express'
import faqRepository from '~/src/db/repository/faq.repository'
import { EndpointAction, Endpoint } from '~/src/types/endpoint'
import { Context, HTTPMethod } from '~/src/types/action'
import { Response } from '~/src/utils/response'
import validators from './validator'

const endpoints: Endpoint = {
  actions: {
    getAll: {
      method   : HTTPMethod.GET,
      validator: validators.getAll,
      before   : [
        (ctx: Context, next: NextFunction) => {
          console.log('this')
          next()
        },
        (ctx: Context, next: NextFunction) => {
          console.log('is')
          next()
        },
        (ctx: Context, next: NextFunction) => {
          console.log('before')
          next()
        }
      ],
      after: [
        (ctx: Context, next: NextFunction) => {
          console.log('this')
          next()
        },
        (ctx: Context, next: NextFunction) => {
          console.log('is')
          next()
        },
        (ctx: Context, next: NextFunction) => {
          console.log('after')
          next()
        }
      ],
      async handler(ctx: Context): Promise<Response> {
        const faqs = await faqRepository()
          .getAllContent()
        return new Response(faqs)
      }
    } as EndpointAction,
    getDefault: {
      method: HTTPMethod.GET,
      async handler(ctx: Context): Promise<Response> {
        const faq = await faqRepository()
          .getLatestContent()
        return new Response(faq)
      }
    } as EndpointAction
  }
}

export default endpoints
