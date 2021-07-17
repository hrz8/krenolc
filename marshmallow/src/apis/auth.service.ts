import { Service, ServiceBroker } from 'moleculer'
import { v4 as uuid } from 'uuid'

import _omit from 'lodash/omit'
import _set from 'lodash/set'

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
                                select: [
                                    'id',
                                    'email',
                                    'name',
                                    'lastLogin'
                                ],
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

                        const result = _omit(userFromDb, ['defaultBot', 'bots'])
                        _set(result, 'defaultBot', _omit(userFromDb.defaultBot, [
                            'createdAt',
                            'updatedAt',
                            'deletedAt'
                        ]))
                        _set(result, 'bots', userFromDb.bots.map(o => o.name))
                        return new Response(result)
                    }
                }
            }
        })
    }

    public ActionHello(botName: string): string {
        return `Hello ${botName}`
    }
}
