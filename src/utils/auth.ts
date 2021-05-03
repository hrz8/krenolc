import jwt from 'express-jwt'
import { expressJwtSecret } from 'jwks-rsa'
import EnvFactory from './env'

const AUTH0_DOMAIN = EnvFactory.get<string>('AUTH0_DOMAIN', 'app.auth0.com')

export default jwt({
    secret: expressJwtSecret({
        cache                : true,
        rateLimit            : true,
        jwksRequestsPerMinute: 5,
        jwksUri              : `https://${AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience  : 'https://localhost:8009/login',
    issuer    : `https://${AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
})
