import dotenv, { DotenvConfigOptions } from 'dotenv'

export default (): void => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
  const { NODE_ENV: ENV } = process.env
  const envConfig: DotenvConfigOptions = {
    path : `${__dirname}/../../.env/${ENV}`,
    debug: ENV === 'dev'
  }
  dotenv.config(envConfig)
}
