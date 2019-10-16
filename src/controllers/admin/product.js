const { Product, validate } = require('../../models/product')
const asyncFs = require('fs').promises
const fs = require('fs')

const writeF = async (imageData) => {

    const ext = imageData.substring(imageData.indexOf('/') + 1, imageData.indexOf(';'))
    if (ext !== 'png' && ext !== 'jpeg') return {
        err: {
            status: 400,
            message: 'Only png and jpeg are allowed.'
        }
    }

    const base64 = imageData.split(';base64,').pop()
    const imageName = Date.now() + '.' + ext
    const filePath = __dirname + `/../../../public/img/` + imageName

    await asyncFs.writeFile(filePath, base64, { encoding: 'base64' })

    if (fs.existsSync(filePath)) return { imageName }
    else return { err: { status: 500, message: `"Image" wasn't successfuly uploaded!` } }
}

//GET /product
module.exports.getProducts = async (req, res) => {
    const productsCount = await Product.countDocuments()
    const products = await Product.find().sort('-_id').skip(parseInt((req.query.page) - 1) * 5).limit(5)
    res.send({ data: { products, pages: Math.ceil(productsCount / 5) } })
}

//GET /product/:id
module.exports.getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id)
    res.send({ data: product })
}

//POST /product
module.exports.addProduct = async (req, res) => {
    if (!req.body.image) return res.send({ meta: { errorM: '"Image" is required.' } })

    const { imageName, err } = await writeF(req.body.image)
    if (err) return res.status(err.status).send({ meta: { errorM: err.message } })
    if (!imageName) return res.status(err.status).send({ meta: { errorM: err.message } })
    req.body.image = '/img/' + imageName

    const { value, error } = validate(req.body)
    if (error) return res.send({ meta: { errorM: error.message } })

    const product = await Product.create(value)
    res.send({ data: product, meta: { success: 'Created Successfully' } })
}

//PATCH /product/:id
module.exports.editProduct = async (req, res) => {
    if (!req.body.image) return res.send({ meta: { errorM: '"Image" is required.' } })

    const { imageData, changed } = req.body.image

    if (imageData && changed) {
        const { imageName, err } = await writeF(imageData)
        if (err) return res.status(err.status).send({ meta: { errorM: err.message } })
        if (!imageName) return res.status(err.status).send({ meta: { errorM: err.message } })
        req.body.image = '/img/' + imageName
    }

    const { value, error } = validate(req.body)
    if (error) return res.send({ meta: { errorM: error.message } })

    const product = await Product.findByIdAndUpdate(req.params.id, { $set: value }, { new: true })
    res.send({ data: product, meta: { success: 'Edited Successfully.' } })
}

//DELETE /product/:id
module.exports.removeProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id)
    res.send({ meta: { success: 'Deleted Successfully' } })
}
