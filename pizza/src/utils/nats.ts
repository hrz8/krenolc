import {
    connect as natsConnect, JSONCodec as natsJSONCodec, NatsConnection
} from 'nats'
import EnvFactory from './env'

export interface INats {
    connection: () => Promise<NatsConnection>,
    publish: (subject: string, message: Record<string, any>) => Promise<void>
    close: (nc: NatsConnection) => Promise<void>
}

const nats: INats = {
    connection(): Promise<NatsConnection> {
        const serverUrl = EnvFactory.get<string>('NATS_SERVER', 'localhost:4222')
        return natsConnect({
            servers: serverUrl
        })
    },

    async publish(subject: string, message: Record<string, any>): Promise<void> {
        const nc: NatsConnection = await this.connection()
        nc.publish(subject, natsJSONCodec()
            .encode(message))
        await this.close(nc)
    },

    async close(nc: NatsConnection): Promise<void> {
        await nc.drain()
    }
}

export default nats
