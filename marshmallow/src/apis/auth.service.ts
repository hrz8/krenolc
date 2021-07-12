import Joi from 'joi'
import {
    Service, ServiceBroker, Context
} from 'moleculer'

export default class UserService extends Service {
    public constructor(public broker: ServiceBroker) {
        super(broker)
        this.parseServiceSchema({
            name   : 'auth',
            actions: {
                login: {
                    rest: {
                        method: 'POST',
                        path  : '/login'
                    },
                    handler: async (ctx): Promise<string> => 'hai'
                }
            }
        })
    }

    public ActionHello(botName: string): string {
        return `Hello ${botName}`
    }
}
