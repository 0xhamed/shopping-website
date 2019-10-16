const paypal = require('paypal-rest-sdk')
const { Product } = require('../../models/product')
const { User } = require('../../models/user')
const Order = require('../../models/order')
const mongoose = require('mongoose')
const config = require('../../startup/config')


paypal.configure({
    "mode": config.paypal_mode,
    "client_id": config.paypal_client_id,
    "client_secret": config.paypal_client_secret
})

// POST /checkout
module.exports.postCheckout = async (req, res, next) => {

    if (!req.session.user.address.name) {
        req.session.meta.errorM = 'Please add address before purchasing!'
        req.session.meta.path = '/cart/items'
        return res.redirect('/cart')
    }

    const oOrder = JSON.parse(req.body.items)

    const productsId = []
    let valid = true

    const order = {
        products: [],
        user: mongoose.Types.ObjectId(req.session.user._id)
    }

    oOrder.forEach(item => {
        if (mongoose.Types.ObjectId.isValid(item.product) && !isNaN(parseInt(item.quantity))) {
            item.quantity = parseInt(item.quantity)
            productsId.push(item.product)
            order.products.push({ product: mongoose.Types.ObjectId(item.product), quantity: item.quantity })
        }
        else valid = false
    })

    if (!valid) return res.status(400).send()

    const products = await Product.find().where('_id').in(productsId)

    let total = 0
    const items = []
    products.forEach(product => {
        const item = oOrder.find(item => item.product === product._id.toString())
        total += product.price * item.quantity
        items.push({
            name: product.name,
            sku: product._id,
            price: product.price,
            currency: 'USD',
            quantity: item.quantity
        })
    })

    order.total = total

    const payReq = JSON.stringify({
        intent: 'sale',
        payer: { payment_method: 'paypal' },
        redirect_urls: {
            return_url: 'http://localhost:3000/checkout/process',
            cancel_url: 'http://localhost:3000/cart'
        },
        transactions: [{
            item_list: { items },
            amount: { total: parseFloat(total).toFixed(2), currency: 'USD' }
        }]
    })

    paypal.payment.create(payReq, async (error, payment) => {
        if (error) next(error)
        else {
            order.paymentId = payment.id
            await Order.create(order)
            const link = payment.links.find(link => link.rel === 'approval_url')
            res.redirect(link.href)
        }
    })
}

// GET /checkout/process
module.exports.processCheckout = (req, res, next) => {
    const paymentId = req.query.paymentId
    const payerId = { payer_id: req.query.PayerID }

    paypal.payment.execute(paymentId, payerId, async (error, payment) => {
        if (error) next(error)
        else {
            if (payment.state == 'approved') {
                await Order.updateOne({ paymentId }, { $set: { status: 'paid' } })
                await User.updateOne({ _id: req.session.user._id }, { $set: { cart: [] } })
                req.session.user.cart = []
                req.session.meta.success = 'Successful Purchase.'
                res.redirect('/cart')
            } else {
                await Order.updateOne({ paymentId }, { $set: { status: 'canceled' } })
                req.session.meta.errorM = 'Purchase wasn\'t Successful!'
                res.redirect('/cart')
            }
        }
    })
}
