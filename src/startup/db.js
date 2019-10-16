const mongoose = require('mongoose')
const logger = require('../utils/logger')
const config = require('./config')

module.exports = () => {
    mongoose.connect(config.db_URI, {
        useNewUrlParser: true, useFindAndModify: false,
        useUnifiedTopology: true, useCreateIndex: true
    }).then(logger.info(`connected to ${config.db_URI}`))
}
