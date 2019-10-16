const { User, validateLogin } = require('../../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// GET /login
module.exports.getLogin = (req, res) => {
    res.render('login')
}

// POST /login
module.exports.postLogin = async (req, res) => {

    const { value, error } = validateLogin(req.body)
    if (error) return res.send({ meta: { errorM: error.message } })

    const user = await User.findOne({ email: value.email })

    if (user && await bcrypt.compare(value.password, user.password)) {

        if (value.localCartItems && value.localCartItems[0]) {
            value.localCartItems.forEach(item => {
                const valid = mongoose.Types.ObjectId.isValid(item.product._id)
                if (valid && item.quantity > 0) {
                    const match = user.cart.find(userItem => userItem.product.toString() === item.product._id)
                    if (match) match.quantity += item.quantity
                    else user.cart.push({ product: item.product._id, quantity: item.quantity })
                }
            })
        }

        if (value.localWishList && value.localWishList[0]) {
            user.wishes.forEach(wish => {
                value.localWishList.forEach(lWish => {
                    const valid = mongoose.Types.ObjectId.isValid(lWish.wish._id)
                    if (valid) {
                        if (lWish.wish._id === wish.wish.toString()) {
                            value.localWishList.splice(value.localWishList.indexOf(lWish), 1)
                        }
                    }
                })
            })
            value.localWishList.forEach(lWish => user.wishes.push(lWish))
        }

        if (value.stayLogged) req.session.cookie.maxAge = 60000 * 60 * 24 * 30 // 30 days  
        req.session.user = user
        req.session.save()
        await user.save()
        return res.redirect('/')
    }

    res.status(400).send({ data: 'not done', meta: { errorM: '"Email" or "Password" are wrong.' } })
}
