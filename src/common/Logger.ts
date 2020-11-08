const pino = require("pino");
const dest = pino.destination({ sync: false });
const logger = pino({ ...dest, prettyPrint: { translateTime: true } });

export default logger;
