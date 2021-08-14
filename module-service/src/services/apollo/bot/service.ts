import {
    Context, Service, ServiceBroker
} from 'moleculer'
import { gql } from 'moleculer-apollo-server'

export default class BotService extends Service {
    public constructor(public broker: ServiceBroker) {
        super(broker)
        this.parseServiceSchema({
            name    : 'apollo-bot',
            settings: {
                graphql: {
                    type: `
                        type Bot {
                            metadata: JSON,
                            modules: JSON,
                            name: String
                        }
                    `
                }
            },
            actions: {
                hello: {
                    graphql: {
                        query: 'bot: Bot'
                    },
                    handler: (ctx: Context) => {
                        console.log(ctx.broker.bot.botRaw)
                        return ctx.broker.bot.botRaw
                    }
                }
            }
        })
    }
}
