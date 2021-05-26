import { NatsError } from 'nats'

export interface IncomingMessage { sub: string; data: Record<string, any> }

export interface SubscriptionHandler {
    (err: NatsError | null, msg: IncomingMessage): void
}

export interface Subscription {
    subject: string;
    handler: SubscriptionHandler;
}
