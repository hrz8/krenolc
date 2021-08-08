import { Service, ServiceBroker } from 'moleculer'

import CommonMixin from '@/mixins/common.mixin'
import { Response } from '@/utils/responses/success'

import authValidator from './validator'

export default class UserService extends Service {
    private commonMixin = new CommonMixin()
        .init()

    public constructor(public broker: ServiceBroker) {
        super(broker)
        this.parseServiceSchema({
            name   : 'auth',
            mixins : [this.commonMixin],
            actions: {
                auth0Login: {
                    params : authValidator.auth0Login,
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
