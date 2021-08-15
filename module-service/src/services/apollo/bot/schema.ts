import { moleculerGql as gql } from 'moleculer-apollo-server'

export default {
    type: gql`
        type BotAPI {
            bot: Bot
        }
        type Bot {
            metadata: JSON
            modules: JSON
            name: String
        }
    `,
    resolvers: {
        BotAPI: {
            bot: {
                action: 'get'
            }
        }
    }
}
