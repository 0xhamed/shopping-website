const express = require('express')
const router = express.Router()
const admin = require('../controllers/admin/admin')
const product = require('../controllers/admin/product')
const user = require('../controllers/admin/user')
const order = require('../controllers/admin/order')
const adminMw = require('../middlewares/admin')

// ~~ /admin
router.get('/', adminMw, admin.getAdmin)
router.get('/view', adminMw, admin.getAdminView)

// ~~ /product
router.get('/product', adminMw, product.getProducts)

router.get('/product/:id', adminMw, product.getProduct)

router.post('/product', adminMw, product.addProduct)

router.patch('/product/:id', adminMw, product.editProduct)

router.delete('/product/:id', adminMw, product.removeProduct)

// ~~ /user
router.get('/user', adminMw, user.getUsers)

router.get('/user/:id', adminMw, user.getUser)

router.post('/user', adminMw, user.addUser)

router.patch('/user/:id', adminMw, adminMw, user.editUser)

router.put('/user/:id', adminMw, user.addAddress)

router.delete('/user/:id', adminMw, user.removeUser)

// ~~ /order
router.get('/order', order.getOrders)

router.patch('/order/:id', order.editOrder)

module.exports = router