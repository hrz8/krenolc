import { NatsConnection } from 'nats'
import { SubscriptionObject } from '../types/subscription'
import auditSub from './audit'

const subscriptions = [auditSub]

export default (conn: NatsConnection): SubscriptionObject[] => subscriptions
    .map((obj) => ({
        sub    : conn.subscribe(obj.sub),
        handler: obj.handler
    }))
