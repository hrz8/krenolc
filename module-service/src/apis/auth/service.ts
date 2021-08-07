import { Service, ServiceBroker } from 'moleculer'
import Joi from 'joi'

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
                    handler: async (ctx): Promise<Response> => new Response({
                        foo: 'bar'
                    })
                }
            }
        })
    }

    public ActionHello(botName: string): string {
        return `Hello ${botName}`
    }
}
