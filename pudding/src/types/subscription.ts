import { Subscription } from 'nats'

export interface SubscriptionHandler {
    (codec: any, msg: any): void
}

export interface SubscriptionObject {
    sub: Subscription,
    handler: SubscriptionHandler
}

export interface SubscriptionObjectRaw {
    sub: string,
    handler: SubscriptionHandler
}
