import { NextFunction } from 'express'

import faqRepository from '@db/repository/faq.repository'
import { Response } from '@/utils/responses/success'

import { Endpoint } from '@/types/endpoint'
import { IContext, HTTPMethod } from '@/types/action'
import { ONE_DAY_SEC } from '@/libs/constant'

import validators from './validator'
import FaqModuleError from './error'

const endpoints: Endpoint = {
    actions: {
        getAll: {
            authentication: true,
            permissions   : ['getDefault@faq'],
            method        : HTTPMethod.GET,
            validator     : validators.getAll,
            cache         : {
                enabled: true,
                ttl    : ONE_DAY_SEC
            },
            before: [
                (ctx: IContext, next: NextFunction): void => {
                    console.log('this')
                    next()
                },
                (ctx: IContext, next: NextFunction): void => {
                    console.log('is')
                    next()
                },
                (ctx: IContext, next: NextFunction): void => {
                    console.log('before')
                    next()
                }
            ],
            after: [
                (ctx: IContext, next: NextFunction): void => {
                    console.log('this')
                    next()
                },
                (ctx: IContext, next: NextFunction): void => {
                    console.log('is')
                    next()
                },
                (ctx: IContext, next: NextFunction): void => {
                    console.log('after')
                    next()
                }
            ],
            async handler(ctx: IContext): Promise<Response> {
                const faqs = await faqRepository()
                    .getAllContent()
                return new Response(faqs)
            }
        },
        getDefault: {
            method: HTTPMethod.GET,
            cache : true,
            async handler(ctx: IContext): Promise<Response> {
                const faq = await faqRepository()
                    .getLatestContent()
                return new Response(faq)
            }
        },
        tryError: {
            method: HTTPMethod.GET,
            async handler(ctx: IContext): Promise<Response> {
                throw FaqModuleError.TryError({
                    data: 'foobar'
                }, 'error message')
            }
        },
        tryErrorJs: {
            method: HTTPMethod.GET,
            async handler(ctx: IContext): Promise<Response> {
                throw Error('ERRRRR')
            }
        },
        tryCache: {
            method: HTTPMethod.GET,
            async handler(ctx: IContext): Promise<Response> {
                const data = await ctx.utils.cacher.get('foo')
                return new Response({
                    data
                })
            }
        },
        tryNats: {
            method: HTTPMethod.POST,
            async handler(ctx: IContext): Promise<Response> {
                await ctx.utils.nats.publish('oy.bar', {
                    bar: 'foo'
                })
                return new Response({
                    bar: 'foo'
                })
            }
        }
    }
}

export default endpoints
