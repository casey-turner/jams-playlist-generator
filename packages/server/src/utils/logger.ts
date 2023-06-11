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
  data: unknown
) => {
  switch (level) {
    case logLevels.info:
      console.log(`[INFO] ${message}, src: ${src}, data: ${formatData(data)}`);
      break;
    case logLevels.warn:
      console.warn(`[WARN] ${message}, src: ${src}, data: ${formatData(data)}`);
      break;
    case logLevels.error:
      console.error(`[ERROR] ${message}, src: ${src}, data: ${formatData(data)}`);
      break;
    case logLevels.debug:
      console.debug(`[DEBUG] ${message}, src: ${src}, data: ${formatData(data)}`);
      break;
    case logLevels.trace:
      console.log(`[TRACE] ${message}, src: ${src}, data: ${formatData(data)}`);
      break;
    default:
      console.log(`${message}, src: ${src}, data: ${formatData(data)}`);
  }
};

const formatData = (data: unknown): string => {
  if (typeof data === 'string') {
    return data;
  }
  return JSON.stringify(data);
};

export { logLevels, logger }

