import { ServiceSchema } from 'moleculer'
import ApiGateway from 'moleculer-web'
import { ApolloService } from 'moleculer-apollo-server'

export default (port: number): ServiceSchema => ({
    name  : 'module-service-apollo-gateway',
    mixins: [
        ApiGateway,
        ApolloService({
            routeOptions: {
                path         : '/graphql',
                // cors         : true,
                mappingPolicy: 'restrict'
            }
        })
    ],
    settings: {
        port
    }
})
