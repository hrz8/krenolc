import pino, { LoggerOptions } from 'pino'

const options: LoggerOptions = {
    prettyPrint: {
        colorize     : true,
        translateTime: 'HH:MM:ss yyyy-mm-dd',
        ignore       : 'pid,hostname'
    }
}

const log = pino(options)

export default log
