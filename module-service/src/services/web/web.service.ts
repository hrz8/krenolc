import { ServiceSchema } from 'moleculer'
import ApiGateway from 'moleculer-web'
import env from 'env-var'

import WebMixin from '@/mixins/web.mixin'

const services = ['auth', 'user']

export default async (moduleRoutes: any): Promise<ServiceSchema> => {
    const webMixin = new WebMixin()
        .init()
    const routes = await services
        .reduce(async (acc, moduleId) => {
            const moduleEndpoint = (await import(`@/services/web/${moduleId}/endpoint`)).default
            return [...acc, ...moduleEndpoint]
        }, [] as any)
    return {
        name    : 'module-service-web-gateway',
        mixins  : [ApiGateway, webMixin],
        settings: {
            port: env.get('APP_PORT')
                .default(3000)
                .asString(),
            routes          : [...routes, ...moduleRoutes],
            log4XXResponses : false,
            logRequestParams: null,
            logResponseData : null
        }
    }
}
