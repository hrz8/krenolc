export type Endpoint = {
  method: string; url: string
}
export type Endpoints = Record<string, Record<string, Endpoint>>

const endpoints: Endpoints = {
  auth: {
    loginAuth0: {
      method: 'post',
      url   : '/auth/login-auth0'
    },
    loginKeycloak: {
      method: 'post',
      url   : '/auth/login-keycloak'
    },
    getProvider: {
      method: 'get',
      url   : '/auth/provider'
    }
  },
  placeholder: {
    users: {
      method: 'get',
      url   : '/users'
    }
  }
}

export default endpoints
