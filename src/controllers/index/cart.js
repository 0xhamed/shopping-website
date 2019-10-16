
const { User } = require('../../models/user')

// GET /cart
module.exports.getCart = async (req, res) => {
    const { success, errorM } = req.session.meta
    delete req.session.meta
    res.render('cart')
}

// GET /cart/items
module.exports.getCartItems = async (req, res) => {
    const user = await User.findById(req.session.user._id).populate('cart.product')
    res.send({ data: user.cart })
}

// DELETE /cart/:id
module.exports.removeCartItem = async (req, res) => {
    if (!req.session.user.cart) return res.send()

    const sItem = req.session.user.cart.find(item => item.product === req.params.id)

    if (!sItem) return res.status(404).send({ meta: { errorM: 'Not Found!' } })

    const user = await User.findById(req.session.user._id)
    const item = user.cart.find(item => item.product._id == sItem.product)
    await item.remove()
    await user.save()
    req.session.user.cart = user.cart
    req.session.save()

    res.send({ data: 'done', meta: { success: 'Removed Successfully.' } })
}