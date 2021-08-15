import { ServiceSchema } from 'moleculer'
import ApiGateway from 'moleculer-web'

import WebMixin from '@/mixins/web.mixin'

const services = ['auth', 'user']

const routesBuilder = async (svcs: string[]): Promise<any[]> => {
    const routes = []
    for await (const serviceId of svcs) {
        const serviceEndpoint = (await import(`@/services/web/${serviceId}/endpoint`)).default
        routes.push(...serviceEndpoint)
    }
    return routes
}

export default async (port: number, moduleRoutes: any): Promise<ServiceSchema> => {
    const webMixin = new WebMixin()
        .init()
    const routes = await routesBuilder(services)
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
