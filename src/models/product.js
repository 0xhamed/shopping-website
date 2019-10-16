const mongoose = require('mongoose')
const Joi = require('@hapi/joi')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    price: Number,
    dprice: Number,
    image: String,
    description: String,
    date: String
})

const Product = mongoose.model('product', productSchema)

const validate = (body) => {
    const price = parseFloat(body.price)
    const dprice = parseFloat(body.dprice)

    if (price) body.price = price
    else return { error: { message: '"Price" is required and must be a number' } }

    if (dprice) body.dprice = dprice
    else if (!isNaN(dprice)) return { error: { message: '"Discounted Price" must be number' } }

    body.date = (new Date()).toUTCString()

    const schema = Joi.object({
        name: Joi.string().max(50).required()
            .error(() => new Error('"Name" is required, max 50 chars')),
        price: Joi.any(),
        dprice: Joi.any(),
        description: Joi.string().max(2048).required()
            .error(() => new Error('"Description" is required and it has to be max 2048 chars')),
        date: Joi.string(),
        image: Joi.any()
    })
    return schema.validate(body);
}
module.exports = { Product, validate }