import Joi from 'joi'
import {
    Service, ServiceBroker, Context
} from 'moleculer'

export default class RestapiService extends Service {
    public constructor(public broker: ServiceBroker) {
        super(broker)
        this.parseServiceSchema({
            name   : 'restapi',
            actions: {
                chat: {
                    params: Joi.object()
                        .keys({
                            query : Joi.object(),
                            params: Joi.object()
                                .keys({
                                    foo: Joi.string()
                                        .required()
                                }),
                            body: Joi.object()
                        }) as any,
                    async handler(ctx: Context<{ params: { foo: string } }>): Promise<string> {
                        const { foo } = ctx.params.params
                        return this.ActionHello(foo)
                    }
                }
            }
        })
    }

    public ActionHello(botName: string): string {
        return `Hello ${botName}`
    }
}
