const express = require('express')
const router = express.Router()
const login = require('../controllers/auth/login')
const register = require('../controllers/auth/register')
const logout = require('../controllers/auth/logout')
const authMw = require('../middlewares/auth')
const locals = require('../middlewares/locals')


router.get('/login', authMw, locals, login.getLogin)

router.post('/login', authMw, login.postLogin)

router.get('/register', authMw, locals, register.getRegister)

router.post('/register', authMw, register.postRegister)

router.get('/logout', logout)

module.exports = router