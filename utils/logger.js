const winston = require('winston');
const { LOGGING: { LEVEL } } = require('_config');

const { combine, timestamp, prettyPrint, errors } = winston.format;
    
module.exports = winston.createLogger({
    format: combine(
        errors({ stack: true }),
        timestamp(),
        prettyPrint()
    ),
    level: LEVEL,
    transports: [
        new winston.transports.Console()
    ]
});
