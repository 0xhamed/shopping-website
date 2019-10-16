const config = require('../startup/config')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

module.exports = session({
    secret: config.session_secret,
    resave: false,
    saveUninitialized: false,
    cookie: {},
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 720 // session expiry/delete date to now + 12 hours
    })
})
