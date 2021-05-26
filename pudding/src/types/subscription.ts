import { NatsError } from 'nats'

export interface IncomingMessage<T> { sub: string; data: T }

export interface SubscriptionHandler {
    (err: NatsError | null, msg: IncomingMessage<any>): void
}

export interface Subscription {
    subject: string;
    handler: SubscriptionHandler;
}
