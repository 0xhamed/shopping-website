const path = require('path')
const express = require('express')
const session = require('../middlewares/session')
const locals = require('../middlewares/locals')
const index = require('../routes/index')
const admin = require('../routes/admin')
const auth = require('../routes/auth')
const error500 = require('../middlewares/500')
const error404 = require('../middlewares/404')

module.exports = (app) => {
    app.use(express.static(path.join(__dirname, '../../public')))
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json({ limit: '300kb' }))

    app.set('view engine', 'ejs')
    app.set('views', 'src/views')

    app.use(session)
    app.use(locals)

    app.use(index)
    app.use('/admin', admin)
    app.use('/auth', auth)

    app.use(error500)
    app.use(error404)
}
