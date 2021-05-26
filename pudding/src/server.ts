import subscriptions from './subscriptions'
import EnvFactory from './utils/env'
import log from './utils/logger'
import Nats from './utils/nats'

const main = async () => {
    EnvFactory.init()

    const natsServer = EnvFactory.get<string>('NATS_SERVER', 'localhost:4222')
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
