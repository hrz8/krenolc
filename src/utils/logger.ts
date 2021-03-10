import pino, { LoggerOptions } from 'pino'

const options: LoggerOptions = {
  prettyPrint: {
    colorize     : true,
    translateTime: 'HH:MM:ss yyyy-mm-dd',
    ignore       : 'pid'
  }
}

export default pino(options)
