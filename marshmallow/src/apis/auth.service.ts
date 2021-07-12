import Joi from 'joi'
import {
    Service, ServiceBroker, Context
} from 'moleculer'
import userRepository from '@db/repository/user.repository'

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
                    handler: async (ctx): Promise<string> => {
                        const { user } = ctx.meta
                        const userFromDb = await userRepository()
                            .findOne({
                                where: {
                                    email: user.email
                                },
                                relations: ['bots']
                            })
                        return 'hai'
                    }
                }
            }
        })
    }

    public ActionHello(botName: string): string {
        return `Hello ${botName}`
    }
}
