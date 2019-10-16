const { Product } = require('../../models/product')
const { User } = require('../../models/user')

const mongoose = require('mongoose')

// GET /products
module.exports.getProducts = async (req, res) => {
    const page = req.query.page
    const width = req.query.width

    if (!page) return res.render('products')

    const productsCount = await Product.countDocuments()

    if (page && width < 768) {
        const products = await Product.find().sort('-_id').skip(parseInt(page - 1) * 4).limit(4)
        return res.send({ data: { products, pages: Math.ceil(productsCount / 4) } })
    }
    else if (page && width < 990) {
        const products = await Product.find().sort('-_id').skip(parseInt(page - 1) * 6).limit(6)
        return res.send({ data: { products, pages: Math.ceil(productsCount / 6) } })
    }
    else {
        const products = await Product.find().sort('-_id').skip(parseInt(page - 1) * 8).limit(8)
        return res.send({ data: { products, pages: Math.ceil(productsCount / 8) } })
    }
}

// GET /products/:id
module.exports.getProduct = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send()
    const product = await Product.findById(req.params.id)
    if (!product) return res.redirect('/404')
    res.render('product', { product })
}


// POST /cart/:id 
module.exports.addToCart = async (req, res) => {
    const session = req.session

    const valid = mongoose.Types.ObjectId.isValid(req.params.id)
    if (!valid) return res.send({ meta: { errorM: 'Invaid id!' } })

    const item = session.user.cart.find(item => item.product.toString() === req.params.id)
    if (item) item.quantity++
    else session.user.cart.push({ product: req.params.id, quantity: 1 })

    const user = await User.findById(session.user._id)
    user.cart = session.user.cart
    await user.save()

    res.send({ meta: { success: 'Added to cart successfully.' } })
}

// POST /wishes/:id 
module.exports.addToWishList = async (req, res) => {
    const session = req.session

    const valid = mongoose.Types.ObjectId.isValid(req.params.id)
    if (!valid) return res.send({ meta: { errorM: 'Invaid id!' } })

    const wish = session.user.wishes.find(wish => wish.wish.toString() === req.params.id)

    if (wish) return res.send({ meta: { errorM: 'Wish already exists!' } })
    else session.user.wishes.push({ wish: req.params.id })

    const user = await User.findById(session.user._id)
    user.wishes = session.user.wishes
    await user.save()

    res.send({ meta: { success: 'Added to wishes successfully.' } })
}