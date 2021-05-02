import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

// bot
export const BRAIN_DEFAULT = 'KRN'

// time
export const ONE_DAY_SEC = dayjs.duration(1, 'day')
  .asSeconds()
export const ONE_DAY_MS = dayjs.duration(1, 'day')
  .asMilliseconds()
