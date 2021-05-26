import {
    NatsConnection, Codec, connect as natsConnect, JSONCodec as natsJSONCodec
} from 'nats'
import { Subscription } from '../types/subscription'

class NatsWrapper {
    private server: string

    private connection: NatsConnection | null = null

    private subscriptions: Subscription[] = []

    private codec: Codec<any>

    constructor(server: string) {
        this.codec = natsJSONCodec()
        this.server = server
    }

    public use(subs: Subscription[]): void {
        this.subscriptions = subs
    }

    public async listen(): Promise<void> {
        // core props
        this.connection = await natsConnect({
            servers: this.server
        })
        this.codec = natsJSONCodec()

        // register all subscriptions
        this.register(this.subscriptions)
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
