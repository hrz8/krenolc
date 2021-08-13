import env from 'env-var'
import { Service, ServiceBroker } from 'moleculer'

import CommonMixin from '@/mixins/common.mixin'
import { Response } from '@/utils/responses/success'

import authValidator from './validator'

export default class AuthService extends Service {
    private commonMixin = new CommonMixin()
        .init()

    public constructor(public broker: ServiceBroker) {
        super(broker)
        this.parseServiceSchema({
            name   : 'auth',
            mixins : [this.commonMixin],
            actions: {
                provider: {
                    params : authValidator.provider,
                    handler: async (ctx): Promise<Response> => new Response({
                        authProvider: env.get('AUTH_PROVIDER')
                            .default('AUTH0')
                            .asString()
                    })
                },
                loginAuth0: {
                    params : authValidator.loginAuth0,
                    handler: async (ctx): Promise<Response> => new Response({
                        foo: 'bar'
                    })
                },
                loginKeycloak: {
                    params : authValidator.loginKeycloak,
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
