import {
    Codec, connect as natsConnect, JSONCodec as natsJSONCodec, Subscription, NatsConnection
} from 'nats'
import getNatsSubscriptions from '../subscriptions'
import log from './logger'
import { SubscriptionHandler, SubscriptionObject } from '../types/subscription'

interface SubsObj { subs: Subscription[], handlers: SubscriptionHandler[] }
export default class NatsFactory {
    private static connection: NatsConnection

    private static codec: Codec<any>

    public static async init(): Promise<void> {
        this.connection = await natsConnect({
            servers: process.env.NATS_SERVER
        })
        this.codec = natsJSONCodec()
        const subObjArr = getNatsSubscriptions(this.connection)
        const subObj = subObjArr.reduce((
            acc: SubsObj,
            curr: SubscriptionObject
        ): SubsObj => {
            const { sub, handler } = curr
            return {
                subs    : [...acc.subs, sub],
                handlers: [...acc.handlers, handler]
            }
        }, {
            subs    : [],
            handlers: []
        } as SubsObj)

        // listen wrapper
        this.listener(subObj.subs, subObj.handlers)
    }

    private static async listener(
        subs: Subscription[],
        handlers: SubscriptionHandler[]
    ): Promise<void> {
        return new Promise((res, rej) => {
            try {
                for (const [i, sub] of subs.entries()) {
                    this.listen(sub, handlers[i])
                }
            } catch (err) {
                log.error('error NatsFactory.listen')
                log.error(err)
                rej(err)
            }
        })
    }

    private static async listen(
        sub: Subscription,
        handler: SubscriptionHandler
    ): Promise<void> {
        for await (const msg of sub) {
            handler(this.codec, msg)
        }
    }

    public static getCodec(): Codec<any> {
        return this.codec
    }

    public static getConnection(): NatsConnection {
        return this.connection
    }
}
