import {
    NatsConnection, Codec, connect as natsConnect, JSONCodec as natsJSONCodec
} from 'nats'
import { Subscription } from '../types/subscription'
import subscriptions from '../subscriptions'

class NatsWrapper {
    private server: string

    private connection: NatsConnection | null = null

    private codec: Codec<any>

    constructor(server: string) {
        this.codec = natsJSONCodec()
        this.server = server
    }

    public async listen(): Promise<void> {
        // core props
        this.connection = await natsConnect({
            servers: this.server
        })
        this.codec = natsJSONCodec()

        // register all subscriptions
        this.register(subscriptions)
    }

    private async register(
        subs: Subscription[]
    ): Promise<void> {
        if (this.connection) {
            for await (const subcription of subs) {
                await this.connection.subscribe(subcription.subject, {
                    callback: (err, msg) => subcription.handler(err, {
                        sub : msg.subject,
                        data: this.codec.decode(msg.data) as Record<string, any>
                    })
                })
            }
        }
    }
}

export default (server: string): NatsWrapper => new NatsWrapper(server)
