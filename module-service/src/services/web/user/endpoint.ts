export default [
    {
        path          : '/api/user',
        authentication: false,
        aliases       : {
            'GET ': 'web-user.list'
        }
    }
]
