import { NextFunction } from 'express'

import faqRepository from '@db/repository/faq.repository'
import { Response } from '@/utils/response'

import { EndpointAction, Endpoint } from '@/types/endpoint'
import { Context, HTTPMethod } from '@/types/action'

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
