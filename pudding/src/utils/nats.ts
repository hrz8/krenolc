import {
    Codec, connect as natsConnect, JSONCodec as natsJSONCodec, Subscription, NatsConnection
} from 'nats'

export default class NatsFactory {
    private static connection: NatsConnection

    public static codec: Codec<any>

    private static initiated = false

    public static async init(): Promise<void> {
        this.connection = await natsConnect({
            servers: '127.0.0.1:4222'
        })
        this.codec = natsJSONCodec()
        this.initiated = true
    }

    public static async listen(subscription: Subscription): Promise<void> {
        if (this.initiated) {
            for await (const m of subscription) {
                console.log(`subject: ${m.subject}`)
                console.log(`data: ${JSON.stringify(this.codec.decode(m.data))}`)
            }
        }
    }

    public static getConnection(): NatsConnection {
        return this.connection
    }
}
