import {
    connect as natsConnect, JSONCodec as natsJSONCodec, NatsConnection
} from 'nats'
import env from 'env-var'

export interface INats {
    connection: () => Promise<NatsConnection>,
    publish: (subject: string, message: Record<string, any>) => Promise<void>
    close: (nc: NatsConnection) => Promise<void>
}

const nats: INats = {
    connection(): Promise<NatsConnection> {
        const serverUrl = env.get('NATS_SERVER')
            .required()
            .asString()
        const serverPort = env.get('NATS_PORT')
            .required()
            .asString()
        return natsConnect({
            servers: `${serverUrl}:${serverPort}`
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
