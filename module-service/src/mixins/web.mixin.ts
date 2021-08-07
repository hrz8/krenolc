import { IncomingMessage } from 'http'
import env from 'env-var'
import {
    Context, Service, ServiceSchema
} from 'moleculer'
import { Errors } from 'moleculer-web'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
import jwksRsa from 'jwks-rsa'

type MixinSchema = Partial<ServiceSchema> & ThisType<Service>

export default class WebMixin implements Partial<ServiceSchema>, ThisType<Service> {
    private schema: MixinSchema;

    public constructor() {
        this.schema = {
            settings: {
                cors: {
                    origin : '*',
                    methods: [
                        'GET',
                        'OPTIONS',
                        'POST',
                        'PUT',
                        'DELETE'
                    ],
                    allowedHeaders: true,
                    exposedHeaders: true,
                    credentials   : false,
                    maxAge        : 3600
                }
            },
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

                        const decoded = await this.jwtVerify(token, secret)
                        const user = decoded['http://login.hirzi.site/metadata']
                        return user
                    } catch (err) {
                        throw new Errors.UnAuthorizedError(Errors.ERR_INVALID_TOKEN, {
                            error: `access token not valid 🔑${err instanceof JsonWebTokenError ? `, ${err.message}` : ''}`
                        })
                    }
                }
            },
            merged: this.merged
        }
    }

    public init(): MixinSchema {
        return this.schema
    }

    private jwtVerify(token: string, secret: string): Promise<any> {
        return new Promise((resolve, reject) => jwt.verify(token, secret, {
            algorithms: ['RS256']
        }, (err, decoded) => {
            if (err) {
                reject(err)
            }
            resolve(decoded)
        }))
    }

    private async merged(schema: ServiceSchema): Promise<void> {
        const mutatedRoutes = schema.settings.routes.map((route: any) => ({
            mergeParams   : false,
            authentication: true,
            authorization : true,
            bodyParsers   : {
                json: {
                    strict: false,
                    limit : '10MB'
                },
                urlencoded: {
                    extended: true,
                    limit   : '10MB'
                }
            },
            mappingPolicy: 'all',
            logging      : true,
            ...route
        }))
        schema.settings.routes = mutatedRoutes
    }
}
