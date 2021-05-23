import { SubscriptionObjectRaw } from '../types/subscription'

const sub: SubscriptionObjectRaw = {
    sub    : 'audit',
    handler: (codec: any, msg: any) => {
        console.log(`subject: ${msg.subject}`)
        console.log(`data: ${JSON.stringify(codec.decode(msg.data))}`)
    }
}

export default sub
