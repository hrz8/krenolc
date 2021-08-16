import { moleculerGql as gql } from 'moleculer-apollo-server'

export default {
    type: gql`
        type UserAPI {
            list: UserList
        }
        type UserList {
            users: [User]
            total: Int
        }
        type User {
            email: String
            name: String
        }
    `,
    resolvers: {
        UserAPI: {
            list: {
                action: 'list'
            }
        }
    }
}
