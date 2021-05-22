import { connect as natsConnect } from 'nats'

const main = async () => {
    const nc = await natsConnect({
        servers: '127.0.0.1:4222'
    })
    console.log(`connected to ${nc.getServer()}`)
    const done = nc.closed()

    await nc.close()
    const err = await done
    if (err) {
        console.log('error closing:', err)
    }
}

(async function () {
    await main()
}())
