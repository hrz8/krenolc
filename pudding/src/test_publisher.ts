import { connect as natsConnect, JSONCodec as natsJSONCodec } from 'nats'

(async function () {
    const natsClient = await natsConnect({
        servers: '127.0.0.1:4222'
    })
    console.log(`connected to ${natsClient.getServer()}`)

    const codec = natsJSONCodec()

    natsClient.publish('audit', codec.encode({
        foo: 'bar'
    }))
    natsClient.publish('oy.bar', codec.encode({
        bar: 'foo'
    }))

    await natsClient.drain()
}())
