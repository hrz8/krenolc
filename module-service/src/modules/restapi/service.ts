import {
    Service,
    ServiceBroker,
    Context
} from 'moleculer'
import chatValidator from './validator'

export default class RestapiService extends Service {
    public constructor(public broker: ServiceBroker) {
        super(broker)
        this.parseServiceSchema({
            name   : 'restapi',
            actions: {
                chat: {
                    params: chatValidator.chat,
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
