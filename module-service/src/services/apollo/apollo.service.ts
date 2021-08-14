import { ServiceSchema } from 'moleculer'
import ApiGateway from 'moleculer-web'
import { ApolloService, gql } from 'moleculer-apollo-server'
import { GraphQLScalarType } from 'graphql'
import GraphQLJSON from 'graphql-type-json'

export default (port: number): ServiceSchema => {
    const GraphQLDate = new GraphQLScalarType({
        name      : 'Date',
        parseValue: (value: any): Date => new Date(value),
        serialize : (value: any): string => value.toISOString()
    })
    return {
        name  : 'module-service-apollo-gateway',
        mixins: [
            ApiGateway,
            ApolloService({
                typeDefs: `
                    scalar JSON
                    scalar Date
                `,
                resolvers: {
                    JSON: GraphQLJSON,
                    Date: GraphQLDate
                },
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
    }
}
