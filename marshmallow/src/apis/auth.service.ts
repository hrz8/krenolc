import { Service, ServiceBroker } from 'moleculer'
import { v4 as uuid } from 'uuid'

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
                    handler: async (ctx): Promise<{id: string}> => {
                        const { user } = ctx.meta
                        const userFromDb = await userRepository()
                            .findOne({
                                where: {
                                    email: user.email
                                },
                                relations: ['bots']
                            })
                        const userId = userFromDb ? userFromDb.id : uuid()
                        await userRepository()
                            .save({
                                id       : userId,
                                email    : user.email,
                                name     : user.name,
                                lastLogin: new Date()
                            })
                        return {
                            id: userId
                        }
                    }
                }
            }
        })
    }

    public ActionHello(botName: string): string {
        return `Hello ${botName}`
    }
}
