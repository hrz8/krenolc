import { NextFunction } from 'express'
import faqRepository from '~/src/db/repository/faq.repository'
import { Context, Endpoint } from '~/src/types/modules'

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
      }
    ],
    async handler(ctx: Context) {
      const faqs = await faqRepository()
        .getAllContent()
      return {
        status  : 200,
        response: {
          data: faqs
        }
      }
    }
  },
  getDefault: {
    before: [],
    async handler(ctx: Context) {
      const faq = await faqRepository()
        .getLatestContent()
      return {
        status  : 200,
        response: {
          data: faq
        }
      }
    }
  }
}

export default endpoints
