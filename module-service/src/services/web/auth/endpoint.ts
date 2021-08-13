export default [
    {
        path          : '/api/auth',
        authentication: false,
        aliases       : {
            'GET provider': 'auth.provider'
        }
    },
    {
        path          : '/api/auth',
        authentication: true,
        aliases       : {
            'POST login-auth0'   : 'auth.loginAuth0',
            'POST login-keycloak': 'auth.loginKeycloak'
        }
    }
]
