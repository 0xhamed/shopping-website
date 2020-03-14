
const logger = require('../utils/logger.js')

module.exports = (err, req, res, next) => {
    if (!err) return next()
    logger.error(err.message, err)
    return res.redirect('/500')
}