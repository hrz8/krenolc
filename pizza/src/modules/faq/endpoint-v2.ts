import { NextFunction } from 'express'

import faqRepository from '@db/repository/faq.repository'
import { Response } from '@/utils/responses/success'

import { EndpointAction, Endpoint } from '@/types/endpoint'
import { IContext, HTTPMethod } from '@/types/action'

const endpoints: Endpoint = {
    version: '2.0.0',
    actions: {
        getAll: {
            method: HTTPMethod.GET,
            before: [
                (ctx: IContext, next: NextFunction) => {
                    console.log('this')
                    next()
                },
                (ctx: IContext, next: NextFunction) => {
                    console.log('is')
                    next()
                },
                (ctx: IContext, next: NextFunction) => {
                    console.log('before on v2')
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
                    console.log('after on v2')
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
            async handler(ctx: IContext): Promise<Response> {
                const faq = await faqRepository()
                    .getLatestContent()
                return new Response(faq)
            }
        }
    }
}

export default endpoints
