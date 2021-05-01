import { NextFunction } from 'express'

import faqRepository from '@db/repository/faq.repository'
import { Response } from '@/utils/responses/success'

import { EndpointAction, Endpoint } from '@/types/endpoint'
import { IContext, HTTPMethod } from '@/types/action'

import validators from './validator'
import FaqModuleError from './error'

const endpoints: Endpoint = {
  actions: {
    getAll: {
      method   : HTTPMethod.GET,
      validator: validators.getAll,
      before   : [
        (ctx: IContext, next: NextFunction) => {
          console.log('this')
          next()
        },
        (ctx: IContext, next: NextFunction) => {
          console.log('is')
          next()
        },
        (ctx: IContext, next: NextFunction) => {
          console.log('before')
          next()
        }
      ],
      after: [
        (ctx: IContext, next: NextFunction) => {
          console.log('this')
          next()
        },
        (ctx: IContext, next: NextFunction) => {
          console.log('is')
          next()
        },
        (ctx: IContext, next: NextFunction) => {
          console.log('after')
          next()
        }
      ],
      async handler(ctx: IContext): Promise<Response> {
        const faqs = await faqRepository()
          .getAllContent()
        return new Response(faqs)
      }
    } as EndpointAction,
    getDefault: {
      method: HTTPMethod.GET,
      async handler(ctx: IContext): Promise<Response> {
        const faq = await faqRepository()
          .getLatestContent()
        return new Response(faq)
      }
    } as EndpointAction,
    tryError: {
      method: HTTPMethod.GET,
      async handler(ctx: IContext): Promise<any> {
        throw FaqModuleError.tryError({
          data: 'foobar'
        }, 'error message')
      }
    },
    tryErrorJs: {
      method: HTTPMethod.GET,
      async handler(ctx: IContext): Promise<any> {
        throw Error('ERRRRR')
      }
    },
    tryCache: {
      method: HTTPMethod.GET,
      async handler(ctx: IContext): Promise<any> {
        const data = await ctx.utils.cacher.get('foo')
        return new Response({
          data
        })
      }
    }
  }
}

export default endpoints
