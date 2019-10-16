const logger = require('../utils/logger')

module.exports = () => {
    process.on('uncaughtException', (ex) => {
        logger.error(ex.message, ex)
        setTimeout(() => { process.exit(1) }, 5000)
    })

    process.on('unhandledRejection', (ex) => {
        logger.error(ex.message, ex)
        setTimeout(() => { process.exit(1) }, 5000)
    })
}
