import log from './utils/logger'
import Nats from './utils/nats'

const main = async () => {
    const natsServer = 'localhost:4222'
    const nats = Nats(natsServer)

    nats.listen((err) => {
        if (!err) {
            console.log('listening to: ', natsServer)
            return
        }
        log.error(`encountered nats.listen error: ${err.message}`)
    })
}

(async function () {
    await main()
}())
