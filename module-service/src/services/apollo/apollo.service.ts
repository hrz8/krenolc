import { ServiceSchema } from 'moleculer'
import ApiGateway from 'moleculer-web'
import { ApolloService, moleculerGql as gql } from 'moleculer-apollo-server'
import { GraphQLScalarType, Kind } from 'graphql'
import GraphQLJSON from 'graphql-type-json'

const GraphQLDate = new GraphQLScalarType({
    name      : 'Date',
    parseValue: (value: any): Date => new Date(value),
    serialize : (value: any): string => value.toISOString()
        .split('T')[0],
    parseLiteral: (ast: any): number | null => {
        if (ast.kind === Kind.INT) {
            return parseInt(ast.value, 10)
        }
        return null
    }
})

const GraphQLTimestamp = new GraphQLScalarType({
    name        : 'Timestamp',
    parseValue  : (value: any): Date => new Date(value),
    serialize   : (value: any): string => value.toISOString(),
    parseLiteral: (ast: any): number | null => {
        if (ast.kind === Kind.INT) {
            return parseInt(ast.value, 10)
        }
        return null
    }
})

export default async (port: number): Promise<ServiceSchema> => ({
    name  : 'module-service-apollo-gateway',
    mixins: [
        ApiGateway,
        ApolloService({
            typeDefs: gql`
                scalar JSON
                scalar Date
                scalar Timestamp
            `,
            resolvers: {
                JSON     : GraphQLJSON,
                Date     : GraphQLDate,
                Timestamp: GraphQLTimestamp
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
