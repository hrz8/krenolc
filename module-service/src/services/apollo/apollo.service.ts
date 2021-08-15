import { ServiceSchema } from 'moleculer'
import ApiGateway from 'moleculer-web'
import { ApolloService, gql } from 'moleculer-apollo-server'
import { GraphQLScalarType } from 'graphql'
import GraphQLJSON from 'graphql-type-json'

const GraphQLDate = new GraphQLScalarType({
    name      : 'Date',
    parseValue: (value: any): Date => new Date(value),
    serialize : (value: any): string => value.toISOString()
})

export default async (port: number): Promise<ServiceSchema> => ({
    name  : 'module-service-apollo-gateway',
    mixins: [
        ApiGateway,
        ApolloService({
            typeDefs: [
                gql`
                    scalar JSON
                    scalar Date
                ` as any
                // gql`
                //     type Query {
                //         BotAPI: BotAPI
                //     }
                // `
            ],
            resolvers: {
                JSON: GraphQLJSON,
                Date: GraphQLDate
            },
            routeOptions: {
                path         : '/graphql',
                cors         : false,
                mappingPolicy: 'restrict'
            }
        })
    ],
    settings: {
        port
    }
})
