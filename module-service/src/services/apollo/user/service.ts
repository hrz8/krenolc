import {
    Context,
    Service,
    ServiceBroker
} from 'moleculer'
import { moleculerGql as gql } from 'moleculer-apollo-server'

import userRepository from '@/db/repository/user.repository'

import userSchema from './schema'

export default class ApolloUserService extends Service {
    public constructor(public broker: ServiceBroker) {
        super(broker)
        this.parseServiceSchema({
            name    : 'apollo-user',
            settings: {
                graphql: userSchema
            },
            actions: {
                api: {
                    graphql: {
                        query: gql`
                            type Query {
                                UserAPI: UserAPI
                            }
                        `
                    },
                    handler: (): {} => ({})
                },
                list: {
                    handler: async (ctx: Context): Promise<any> => {
                        const [users, total] = await userRepository()
                            .findAndCount({
                                select: ['email', 'name']
                            })
                        return {
                            users,
                            total
                        }
                    }
                }
            }
        })
    }
}
