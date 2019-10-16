const Order = require('../../models/order')

//GET /order
module.exports.getOrders = async (req, res) => {

    if (!req.session.user) return res.status(401).send()

    const user = req.session.user
    if (user.role === 'admin' || user.role === 'mod') {
        const ordersCount = await Order.countDocuments()

        const orders = await Order.find().populate('user').populate('products.product')
            .sort('-_id').skip(parseInt((req.query.page) - 1) * 5).limit(5)


        orders.forEach(order => order.user.password = null)

        res.send({ data: { orders, pages: Math.ceil(ordersCount / 5) } })
    }
    else {
        const ordersCount = await Order.countDocuments({ user: user._id })

        const orders = await Order.find({ user: user._id }).populate('user').populate('products.product')
            .sort('-_id').skip(parseInt((req.query.page) - 1) * 5).limit(5)

        orders.forEach(order => order.user.password = null)

        res.send({ data: { orders, pages: Math.ceil(ordersCount / 5) } })
    }
}

// PATCH /order/:id
module.exports.editOrder = async (req, res) => {
    if (req.session.user.role !== 'admin' && req.session.user.role !== 'mod')
        return res.status(403).send()

    if (!req.body.status) return res.status(400).send()

    const status = req.body.status
    if (!['pending', 'paid', 'shipped', 'canceled'].includes(status))
        return res.status(400).send()

    await Order.updateOne({ _id: req.params.id }, { $set: { status } })
    res.send({ data: 'done', meta: { success: 'Updated Successfully.' } })
}