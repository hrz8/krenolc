import { Subscription } from '../types/subscription'
import auditSub from './audit'

const subs = {
    ...auditSub
}

const subscriptions: Subscription[] = Object.keys(subs)
    .map((sub) => ({
        subject: sub,
        handler: subs[sub].handler
    }))

export default subscriptions
