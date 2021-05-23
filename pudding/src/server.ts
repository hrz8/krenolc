import NatsFactory from './utils/nats'
import getNatsSubscriptions from './utils/nats/subscriptions'

const natsWrapper = async () => {
    await NatsFactory.init()
    const conn = NatsFactory.getConnection()
    const subscriptions = getNatsSubscriptions(conn)
    for await (const sub of subscriptions) {
        await NatsFactory.listen(sub)
    }
}

const main = async () => {
    await natsWrapper()
}

(async function () {
    await main()
}())
