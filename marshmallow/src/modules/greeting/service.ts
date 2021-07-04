import Joi from 'joi'
import {
    Service, ServiceBroker, Context
} from 'moleculer'

export default class GreeterService extends Service {
    public constructor(public broker: ServiceBroker) {
        super(broker)
        this.parseServiceSchema({
            name   : 'greeter',
            actions: {
                hello: {
                    rest: {
                        method: 'GET',
                        path  : '/hello'
                    },
                    async handler(): Promise<string> {
                        return this.ActionHello()
                    }
                },
                welcome: {
                    rest  : '/welcome',
                    params: Joi.object()
                        .keys({
                            query: Joi.object()
                                .keys({
                                    name: Joi.string()
                                        .required()
                                }),
                            params: Joi.object(),
                            body  : Joi.object()
                        }) as any,
                    async handler(ctx: Context<{ query: { name: string } }>): Promise<string> {
                        return this.ActionWelcome(ctx.params.query.name)
                    }
                }
            }
        })
    }

    public ActionHello(): string {
        return 'Hello Moleculer'
    }

    public ActionWelcome(name: string): string {
        return `Welcome, ${name}`
    }
}
