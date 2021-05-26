import subscriptions from './subscriptions'
import log from './utils/logger'
import Nats from './utils/nats'

const main = async () => {
    const natsServer = 'localhost:4222'
    const nats = Nats(natsServer)

    nats.use(subscriptions)
    nats.listen()
        .then(() => {
            console.log(`listening to: ${natsServer}`)
        })
        .catch((err) => {
            log.error(`encountered nats.listen error: ${err.message}`)
        })
}

(async function () {
    await main()
}())
