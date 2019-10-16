const mongoose = require('mongoose')
const Joi = require('@hapi/joi')

const addressSchema = new mongoose.Schema({
    name: String, street: String, city: String, zip: String, country: String
})

const cartSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    quantity: {
        type: Number,
        default: 0
    }

})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    password: String,
    role: {
        type: String,
        enum: ['user', 'mod', 'admin'],
        default: 'user'
    },
    address: {
        type: addressSchema,
        default: {}
    },
    cart: [cartSchema],
    wishes: [{
        wish: {
            type: mongoose.Types.ObjectId,
            ref: 'product'
        }
    }]
})

const User = mongoose.model('user', userSchema)

const validate = (body) => {
    const msg = 'max 50 chars'
    body.name = body.name.trim()
    body.email = body.email.toLowerCase().trim()

    const schema = Joi.object({
        name: Joi.string().max(50).required()
            .error(() => new Error('"Name" is required, ' + msg)),
        email: Joi.string().email().max(50).required()
            .error(() => new Error('"Email" is required, valid email, ' + msg)),
        password: Joi.string().min(5).max(50).required()
            .error(() => new Error('"Password" is required, min 5 ' + msg)),
        newPassword: Joi.string().min(5).max(50)
            .error(() => new Error('"newPassword" ' + msg)),
        cpassword: Joi.string().min(5).max(50)
            .error(() => new Error('"Confirm password" ' + msg)),
    })
    return schema.validate(body);
}

const validateLogin = (body) => {
    const msg = 'max 50 chars'
    body.email = body.email.toLowerCase().trim()

    const schema = Joi.object({
        email: Joi.string().email().max(50).required()
            .error(() => new Error('"Email" is required, ' + msg)),
        password: Joi.string().max(50).required()
            .error(() => new Error('"Password" is required, ' + msg)),
        stayLogged: Joi.boolean(),
        localCartItems: Joi.array(),
        localWishList: Joi.array()
    })
    return schema.validate(body);
}

const validateAddress = (body) => {
    const msg = 'max 50 chars'
    const schema = Joi.object({
        name: Joi.string().max(50).required()
            .error(() => new Error('"Name" is required,' + msg)),
        street: Joi.string().max(50).required()
            .error(() => new Error('"Street Address" is required, ' + msg)),
        city: Joi.string().max(50).required()
            .error(() => new Error('"City" is required, ' + msg)),
        zip: Joi.string().max(50).required()
            .error(() => new Error('"Zip Code" is required, ' + msg)),
        country: Joi.string().max(50).required()
            .error(() => new Error('"Country" is required, ' + msg)),
    })
    return schema.validate(body);
}

module.exports = { User, validate, validateLogin, validateAddress }