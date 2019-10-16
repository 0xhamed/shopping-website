const { User } = require('../../models/user')

// GET /wishes
module.exports.getWishes = async (req, res) => {
    // const { success, errorM } = req.session.meta
    // delete req.session.meta
    res.render('wishes')
}

// GET /wishes/wishList
module.exports.getWishList = async (req, res) => {
    const user = await User.findById(req.session.user._id).populate('wishes.wish')
    res.send({ data: user.wishes })
}

// DELETE /wishes/:id
module.exports.removeWish = async (req, res) => {
    if (!req.session.user.wishes) return res.send()

    const sWish = req.session.user.wishes.find(wish => wish.wish === req.params.id)

    if (!sWish) return res.status(404).send({ meta: { errorM: 'Not Found!' } })

    const user = await User.findById(req.session.user._id)
    const wish = user.wishes.find(wish => wish.wish == sWish.wish)
    await wish.remove()
    await user.save()
    req.session.user.wishes = user.wishes
    req.session.save()

    res.send({ data: 'done', meta: { success: 'Removed Successfully.' } })
}