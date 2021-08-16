import {
    Context,
    Service,
    ServiceBroker
} from 'moleculer'
import { moleculerGql as gql } from 'moleculer-apollo-server'

import botSchema from './schema'

export default class ApolloBotService extends Service {
    public constructor(public broker: ServiceBroker) {
        super(broker)
        this.parseServiceSchema({
            name    : 'apollo-bot',
            settings: {
                graphql: botSchema
            },
            actions: {
                api: {
                    graphql: {
                        query: gql`
                            type Query {
                                BotAPI: BotAPI
                            }
                        `
                    },
                    handler: (): {} => ({})
                },
                get: {
                    handler: (ctx: Context): any => ctx.broker.bot.botRaw
                }
            }
        })
    }
}
