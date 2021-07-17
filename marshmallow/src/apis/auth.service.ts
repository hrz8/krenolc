import { Service, ServiceBroker } from 'moleculer'
import { v4 as uuid } from 'uuid'

import userRepository from '@db/repository/user.repository'
import CommonMixin from '@/mixins/common.mixxin'
import { Response } from '@/utils/responses/success'

export default class UserService extends Service {
    private commonMixin = new CommonMixin()
        .init()

    public constructor(public broker: ServiceBroker) {
        super(broker)
        this.parseServiceSchema({
            name   : 'auth',
            mixins : [this.commonMixin],
            actions: {
                login: {
                    handler: async (ctx): Promise<Response> => {
                        const { user } = ctx.meta
                        const userFromDb = await userRepository()
                            .findOne({
                                where: {
                                    email: user.email
                                },
                                relations: ['defaultBot', 'bots']
                            })
                        const userId = userFromDb ? userFromDb.id : uuid()
                        await userRepository()
                            .save({
                                id       : userId,
                                email    : user.email,
                                name     : user.name,
                                lastLogin: new Date()
                            })
                        return new Response(userFromDb)
                    }
                }
            }
        })
    }

    public ActionHello(botName: string): string {
        return `Hello ${botName}`
    }
}
