enum logLevels {
  info,
  warn,
  error,
  debug,
  trace,
}

const logger = (
  level: logLevels,
  message: string,
  src: string,
  data: string
) => {
  switch (level) {
    case logLevels.info:
      console.log(`[INFO] ${message}, src: ${src}, data: ${data}`)
      break
    case logLevels.warn:
      console.warn(`[WARN] ${message}, src: ${src}, data: ${data}`)
      break
    case logLevels.error:
      console.error(`[ERROR] ${message}, src: ${src}, data: ${data}`)
      break
    case logLevels.debug:
      console.debug(`[DEBUG] ${message}, src: ${src}, data: ${data}`)
      break
    case logLevels.trace:
      console.log(`[TRACE] ${message}, src: ${src}, data: ${data}`)
      break
    default:
      console.log(`${message}, src: ${src}, data: ${data}`)
  }
}

export { logLevels, logger }
