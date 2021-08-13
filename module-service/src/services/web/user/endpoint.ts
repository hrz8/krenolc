export default [
    {
        path          : '/api/user',
        authentication: false,
        aliases       : {
            'GET ': 'user.list'
        }
    }
]
