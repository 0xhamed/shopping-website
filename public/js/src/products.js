import { Products } from './controllers/index/products.js'

document.onload = (async () => {
    const products = new Products()
    await products.getProducts()
})()
