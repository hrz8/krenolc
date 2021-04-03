import { NextFunction } from 'express'
import faqRepository from '~/src/db/repository/faq.repository'
import { Endpoint } from '~/src/types/endpoint'
import { Context, HTTPMethod } from '~/src/types/action'
import { Response } from '~/src/utils/response'

const endpoints: Endpoint = {
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
    async handler(ctx: Context) {
      const faqs = await faqRepository()
        .getAllContent()
      return new Response(faqs)
    }
  },
  getDefault: {
    method: HTTPMethod.GET,
    async handler(ctx: Context) {
      const faq = await faqRepository()
        .getLatestContent()
      return new Response(faq)
    }
  }
}

export default endpoints
