const mongoose = require('mongoose')

productsSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    quantity: Number

})


const orderSchema = new mongoose.Schema({
    products: [{
        type: productsSchema,
        required: true
    }],
    paymentId: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    total: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ['pending', 'paid', 'shipped', 'canceled'],
        default: 'pending'
    },

})

const Order = mongoose.model('order', orderSchema)

module.exports = Order