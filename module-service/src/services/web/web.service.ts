import { ServiceSchema } from 'moleculer'
import ApiGateway from 'moleculer-web'

import WebMixin from '@/mixins/web.mixin'

const services = ['auth', 'user']

export default async (port: number, moduleRoutes: any): Promise<ServiceSchema> => {
    const webMixin = new WebMixin()
        .init()
    const routes = []
    for await (const serviceId of services) {
        const serviceEndpoint = (await import(`@/services/web/${serviceId}/endpoint`)).default
        routes.push(...serviceEndpoint)
    }
    return {
        name    : 'module-service-web-gateway',
        mixins  : [ApiGateway, webMixin],
        settings: {
            port,
            routes          : [...routes, ...moduleRoutes],
            log4XXResponses : false,
            logRequestParams: null,
            logResponseData : null
        }
    }
}
