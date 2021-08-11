export enum AuthProvider {
  AUTH0 = 'AUTH0',
  KEYCLOAK = 'KEYCLOAK',
}

export abstract class AuthMixins {
  public isAuthenticated = false
  public token = ''
  public loading = false
}