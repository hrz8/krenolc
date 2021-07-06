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
                chat: {
                    async handler(ctx: Context<{ params: { botName: string } }>): Promise<string> {
                        const { botName } = ctx.params.params
                        return this.ActionHello(botName)
                    }
                }
            }
        })
    }

    public ActionHello(botName: string): string {
        return `Hello ${botName}`
    }
}
