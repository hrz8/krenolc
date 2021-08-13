export default [
    {
        path          : '/api/auth',
        authentication: false,
        aliases       : {
            'GET provider': 'web-auth.provider'
        }
    },
    {
        path          : '/api/auth',
        authentication: true,
        aliases       : {
            'POST login-auth0'   : 'web-auth.loginAuth0',
            'POST login-keycloak': 'web-auth.loginKeycloak'
        }
    }
]
