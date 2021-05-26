import {
    NatsConnection, Codec, connect as natsConnect, JSONCodec as natsJSONCodec
} from 'nats'
import { Subscription } from '../types/subscription'
import subscriptions from '../subscriptions'

export default class NatsFactory {
    private static connection: NatsConnection

    private static codec: Codec<any>

    public static async init(): Promise<void> {
        // core props
        this.connection = await natsConnect({
            servers: 'localhost:4222'
        })
        this.codec = natsJSONCodec()

        // register all subscriptions
        this.register(subscriptions)
    }

    private static async register(
        subs: Subscription[]
    ): Promise<void> {
        for await (const subcription of subs) {
            await this.connection.subscribe(subcription.subject, {
                callback: (err, msg) => subcription.handler(err, {
                    sub : msg.subject,
                    data: this.codec.decode(msg.data) as Record<string, any>
                })
            })
        }
    }

    public static getCodec(): Codec<any> {
        return this.codec
    }

    public static getConnection(): NatsConnection {
        return this.connection
    }
}
