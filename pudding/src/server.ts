import NatsFactory from './utils/nats'

const main = async () => {
    await NatsFactory.init()
}

(async function () {
    await main()
}())
