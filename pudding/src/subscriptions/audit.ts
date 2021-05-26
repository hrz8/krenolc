import { IncomingMessage, SubscriptionHandler } from '../types/subscription'

const subs: Record<string, { handler: SubscriptionHandler }> = {
    audit: {
        handler: (err, msg: IncomingMessage<any>): void => {
            console.log('subject:', msg.sub)
            console.log('received:', msg.data)
        }
    },
    'oy.*': {
        handler: (err, msg: IncomingMessage<any>): void => {
            console.log('subject:', msg.sub)
            console.log('received:', msg.data)
        }
    }
}

export default subs
