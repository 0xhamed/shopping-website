const express = require('express')
const router = express.Router()
const index = require('../controllers/index/index')
const products = require('../controllers/index/products')
const get500 = require('../controllers/index/500')
const get404 = require('../controllers/index/404')
const cart = require('../controllers/index/cart')
const loggedIn = require('../middlewares/loggedIn')
const checkout = require('../controllers/index/checkout')
const wishes = require('../controllers/index/wishes')

// index
router.get('/', index.getIndex)

// 500
router.get('/500', get500)

// 404
router.get('/404', get404)

// products
router.get('/products', products.getProducts)

router.get('/products/:id', products.getProduct)

router.post('/cart/:id', loggedIn, products.addToCart)

router.post('/wishes/:id', loggedIn, products.addToWishList)

// cart
router.get('/cart', cart.getCart)

router.get('/cart/items', loggedIn, cart.getCartItems)

router.delete('/cart/:id', loggedIn, cart.removeCartItem)

// checkout
router.post('/checkout', loggedIn, checkout.postCheckout)

router.get('/checkout/process', checkout.processCheckout)

//wishes
router.get('/wishes', wishes.getWishes)

router.get('/wishes/wishList', loggedIn, wishes.getWishList)

router.delete('/wishes/:id', loggedIn, wishes.removeWish)

module.exports = router
