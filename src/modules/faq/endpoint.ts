import { NextFunction } from 'express'
import faqRepository from '~/src/db/repository/faq.repository'
import { Context, Endpoint } from '~/src/types/modules'
import { Response } from '~/src/utils/response'

const endpoints: Endpoint = {
  getAll: {
    before: [
      (ctx: Context, action: any, next: NextFunction) => {
        console.log('this')
        next()
      },
      (ctx: Context, action: any, next: NextFunction) => {
        console.log('is')
        next()
      },
      (ctx: Context, action: any, next: NextFunction) => {
        console.log('middleware')
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
    before: [],
    async handler(ctx: Context) {
      const faq = await faqRepository()
        .getLatestContent()
      return new Response(faq)
    }
  }
}

export default endpoints
