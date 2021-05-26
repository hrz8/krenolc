import Nats from './utils/nats'

const main = async () => {
    const natsServer = 'localhost:4222'
    const nats = Nats(natsServer)

    nats.listen(() => {
        console.log('listening to: ', natsServer)
    })
}

(async function () {
    await main()
}())
