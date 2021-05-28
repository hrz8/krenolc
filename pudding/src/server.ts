import env from 'env-var'
import connectDB from './db/connection'
import subscriptions from './subscriptions'
import EnvFactory from './utils/env'
import log from './utils/logger'
import Nats from './utils/nats'

const main = async () => {
    EnvFactory.init()

    const nats = Nats(`${env.get('NATS_SERVER')
        .required()
        .asString()}:${env.get('NATS_PORT')
        .required()
        .asString()}`)

    await connectDB()
        .then(() => log.info('Database connected successfully'))
        .catch((err) => log.error(`encountered connectDB error: ${err.message}`))

    nats.use(subscriptions)
    nats.listen()
        .then(() => log.info('Nats connected successfully'))
        .catch((err) => log.error(`encountered nats.listen error: ${err.message}`))
}

(async function () {
    await main()
}())
