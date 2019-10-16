const winston = require('winston')
const path = require('path')

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({ filename: path.join(__dirname, '../logfile.log'), level: this.info })
    ],
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json()
    )
})

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.prettyPrint()
    }));
}

module.exports = logger