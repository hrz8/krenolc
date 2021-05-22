import { connect as natsConnect, JSONCodec as natsJSONCodec } from 'nats'

(async function () {
    const nc = await natsConnect({
        servers: '127.0.0.1:4222'
    })
    console.log(`connected to ${nc.getServer()}`)

    const codec = natsJSONCodec()

    nc.publish('audit', codec.encode({
        foo: 'bar'
    }))
    nc.publish('audit', codec.encode({
        bar: 'foo'
    }))

    await nc.drain()
}())
