import { NextFunction } from 'express'

import faqRepository from '@db/repository/faq.repository'
import { Response } from '@/utils/responses/success'

import { EndpointAction, Endpoint } from '@/types/endpoint'
import { Context, HTTPMethod } from '@/types/action'

const endpoints: Endpoint = {
  version: '2.0.0',
  actions: {
    getAll: {
      method: HTTPMethod.GET,
      before: [
        (ctx: Context, next: NextFunction) => {
          console.log('this')
          next()
        },
        (ctx: Context, next: NextFunction) => {
          console.log('is')
          next()
        },
        (ctx: Context, next: NextFunction) => {
          console.log('before on v2')
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
          console.log('after on v2')
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
