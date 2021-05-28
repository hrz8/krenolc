import env from 'env-var'
import subscriptions from './subscriptions'
import EnvFactory from './utils/env'
import log from './utils/logger'
import Nats from './utils/nats'

const main = async () => {
    EnvFactory.init()

    const natsServer = env.get('NATS_SERVER')
        .required()
        .asString()
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
