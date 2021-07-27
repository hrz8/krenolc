import { Service, ServiceBroker } from 'moleculer'
import { v4 as uuid } from 'uuid'
import Joi from 'joi'

import _omit from 'lodash/omit'
import _set from 'lodash/set'

import userRepository from '@db/repository/user.repository'
import CommonMixin from '@/mixins/common.mixin'
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
                    params: Joi.object()
                        .keys({
                            query : Joi.object(),
                            params: Joi.object(),
                            body  : Joi.object()
                        }) as any,
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
                        const userCreated = await userRepository()
                            .save({
                                id       : userId,
                                email    : user.email,
                                name     : user.name || user.email,
                                lastLogin: new Date()
                            })

                        const userFinal = userFromDb || userCreated
                        const result = _omit(userFinal, ['defaultBot', 'bots'])
                        const resultDefaultBot = _omit(userFinal.defaultBot, [
                            'createdAt',
                            'updatedAt',
                            'deletedAt'
                        ])
                        _set(result, 'defaultBot', resultDefaultBot)
                        _set(result, 'bots', (userFinal.bots || []).map(o => o.name))
                        return new Response(result)
                    }
                },
                switchBot: {
                    params: Joi.object()
                        .keys({
                            query : Joi.object(),
                            params: Joi.object()
                                .keys({
                                    botName: Joi.string()
                                        .required()
                                }),
                            body: Joi.object()
                        }) as any,
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
                        const userCreated = await userRepository()
                            .save({
                                id       : userId,
                                email    : user.email,
                                name     : user.name || user.email,
                                lastLogin: new Date()
                            })

                        const userFinal = userFromDb || userCreated
                        const result = _omit(userFinal, ['defaultBot', 'bots'])
                        const resultDefaultBot = _omit(userFinal.defaultBot, [
                            'createdAt',
                            'updatedAt',
                            'deletedAt'
                        ])
                        _set(result, 'defaultBot', resultDefaultBot)
                        _set(result, 'bots', (userFinal.bots || []).map(o => o.name))
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
