import { NatsConnection, Subscription } from 'nats'

const subscriptions: Record<string, string> = {
    AUDIT: 'audit'
}

export default (conn: NatsConnection): Subscription[] => Object.keys(subscriptions)
    .map((key) => conn.subscribe(subscriptions[key]))
