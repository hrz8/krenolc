import { IncomingMessage } from 'http'
import env from 'env-var'
import {
    Context, Service, ServiceSchema
} from 'moleculer'
import { Errors } from 'moleculer-web'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import jwksRsa from 'jwks-rsa'

export default class AuthMixin implements Partial<ServiceSchema>, ThisType<Service> {
    private schema: Partial<ServiceSchema> & ThisType<Service>;

    public constructor() {
        this.schema = {
            methods: {
                authenticate: async (ctx: Context, route: any, req: IncomingMessage): Promise<any> => {
                    const { authorization } = req.headers
                    const token = authorization?.split('Bearer ')[1]

                    if (!token) {
                        throw new Errors.UnAuthorizedError(Errors.ERR_NO_TOKEN, {
                            error: 'you\'re unauthorized, access token needed ⛔️'
                        })
                    }

                    try {
                        const AUTH0_DOMAIN = env.get('AUTH0_DOMAIN')
                            .required()
                            .asString()
                        const { header } = jwt.decode(token, {
                            complete: true
                        }) as { header: { kid: string; alg: string; typ: string } }
                        const client = jwksRsa({
                            cache          : true,
                            cacheMaxEntries: 5,
                            cacheMaxAge    : 600000,
                            jwksUri        : `https://${AUTH0_DOMAIN}/.well-known/jwks.json`
                        })
                        const key = await client.getSigningKey(header?.kid)
                        const secret = key.getPublicKey()

                        const decoded = await this.verify(token, secret)
                        const user = decoded['http://login.hirzi.site/metadata']
                        return user
                    } catch (err) {
                        throw new Errors.UnAuthorizedError(Errors.ERR_INVALID_TOKEN, {
                            error: `access token not valid 🔑${err instanceof JsonWebTokenError ? `, ${err.message}` : ''}`
                        })
                    }
                }
            }
        }
    }

    public init(): Partial<ServiceSchema> & ThisType<Service> {
        return this.schema
    }

    private verify(token: string, secret: string): Promise<any> {
        return new Promise((resolve, reject) => jwt.verify(token, secret, {
            algorithms: ['RS256']
        }, (err, decoded) => {
            if (err) {
                reject(err)
            }
            resolve(decoded)
        }))
    }
}
