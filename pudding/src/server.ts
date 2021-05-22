import {
    Codec, connect as natsConnect, JSONCodec as natsJSONCodec, Subscription
} from 'nats'

const listen = async (subscribtion: Subscription, codec: Codec<any>) => {
    for await (const m of subscribtion) {
        console.log(`subject: ${m.subject}`)
        console.log(`data: ${JSON.stringify(codec.decode(m.data))}`)
    }
}

(async function () {
    const nc = await natsConnect({
        servers: '127.0.0.1:4222'
    })
    console.log(`connected to ${nc.getServer()}`)

    const codec = natsJSONCodec()
    const subscribtion = nc.subscribe('audit')

    await listen(subscribtion, codec)
}())
