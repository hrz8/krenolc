import NatsFactory from './utils/nats'

const natsWrapper = async () => {
    await NatsFactory.init()
    const natsConn = NatsFactory.getConnection()
    const auditSubscription = natsConn.subscribe('audit')
    const subscriptions = [auditSubscription]
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
