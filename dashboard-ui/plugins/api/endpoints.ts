export type Endpoint = {
  method: string; url: string
}
export type Endpoints = Record<string, Record<string, Endpoint>>

const endpoints: Endpoints = {
  auth: {
    login: {
      method: 'post',
      url   : '/auth/login'
    },
    getType: {
      method: 'post',
      url   : '/auth/type'
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
