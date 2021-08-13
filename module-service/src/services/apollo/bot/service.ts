import { Service, ServiceBroker } from 'moleculer'

export default class AuthService extends Service {
    public constructor(public broker: ServiceBroker) {
        super(broker)
        this.parseServiceSchema({
            name   : 'apollo-bot',
            actions: {
                hello: {
                    graphql: {
                        query: 'hello: String!'
                    },
                    handler: () => 'Hello Moleculer!'
                }
            }
        })
    }
}
