import { pagination } from '../../utils/pagination.js'
import { productHtml } from '../../views/product.js'
import { pageNHtml } from '../../views/page.js'
import { request } from '../../utils/request.js'

export class Products {

    constructor() {
        window.addToCart = this.addToCart.bind(this)
        window.addToCartv2 = this.addToCartv2.bind(this)
        window.addToCartv3 = this.addToCartv3.bind(this)
        window.addToWishList = this.addToWishList.bind(this)
        window.addToWishListv2 = this.addToWishListv2.bind(this)

    }

    // GET /
    async getProducts() {
        await pagination('/products', document.querySelector('.products-content'), productHtml, pageNHtml)
    }

    // POST /wishes/:id
    async addToWishList(self) {
        const _id = self.parentNode.parentNode.getAttribute('_id')
        const parent = self.parentNode.parentNode.parentNode
        const name = parent.querySelector('#name').textContent
        const price = parent.querySelector('#price').textContent
        await this.addToWishListFunc(_id, name, price)
    }

    // POST /wishes/:id
    async addToWishListv2(self) {
        const _id = self.getAttribute('_id')
        const name = self.parentNode.querySelector('#name').textContent
        const price = self.parentNode.querySelector('#price').textContent
        await this.addToWishListFunc(_id, name, price)
    }

    // POST /wishes/:id
    async addToWishListFunc(_id, name, price) {
        if (document.querySelector('#loggedIn')) await request(`/wishes/${_id}`, 'POST')
        else {
            if (!localStorage.getItem('wishes')) {
                const wishes = [{ wish: { _id, name, price } }]
                localStorage.setItem('wishes', JSON.stringify(wishes))
                this.showSuccessM('wish list')
            }
            else {
                const deserWishes = JSON.parse(localStorage.getItem('wishes'))
                const wish = deserWishes.find(wish => wish.wish._id === _id)
                if (wish) return this.showErrorM()
                else deserWishes.push({ wish: { _id, name, price } })
                localStorage.setItem('wishes', JSON.stringify(deserWishes))
                this.showSuccessM('wish list')
            }
        }
    }

    // POST /cart/:id
    async addToCart(self) {
        const _id = self.parentNode.parentNode.getAttribute('_id')
        const parent = self.parentNode.parentNode.parentNode
        const name = parent.querySelector('#name').textContent
        const price = parent.querySelector('#price').textContent
        await this.addToCartFunc(_id, name, price)
    }

    // POST /cart/:id
    async addToCartv2(self) {
        const _id = self.getAttribute('_id')
        const name = self.parentNode.querySelector('#name').textContent
        const price = self.parentNode.querySelector('#price').textContent
        await this.addToCartFunc(_id, name, price)
    }

    // POST /cart/:id
    async addToCartv3(self) {
        const _id = self.getAttribute('_id')
        const name = self.parentNode.parentNode.querySelector('#name').textContent
        const price = self.parentNode.parentNode.querySelector('#price').textContent
        await this.addToCartFunc(_id, name, price)
    }


    // POST /cart/:id
    async addToCartFunc(_id, name, price) {
        if (document.querySelector('#loggedIn')) await request(`/cart/${_id}`, 'POST')
        else {
            if (!localStorage.getItem('items')) {
                const items = [{ product: { _id, name, price }, quantity: 1 }]
                localStorage.setItem('items', JSON.stringify(items))
                this.showSuccessM('cart')
            }
            else {
                const deserItems = JSON.parse(localStorage.getItem('items'))
                const item = deserItems.find(item => item.product._id === _id)
                if (item) item.quantity++
                else deserItems.push({ product: { _id, name, price }, quantity: 1 })
                localStorage.setItem('items', JSON.stringify(deserItems))
                this.showSuccessM('cart')
            }
        }
    }

    showSuccessM(dist) {
        const alert = document.querySelector('.alert')
        alert.removeAttribute('hidden')
        alert.classList = 'alert alert-success'
        alert.textContent = `Added to ${dist} successfully.`
        setTimeout(() => { alert.setAttribute('hidden', '') }, 3000)
    }

    showErrorM() {
        const alert = document.querySelector('.alert')
        alert.removeAttribute('hidden')
        alert.classList = 'alert alert-danger'
        alert.textContent = `Wish already exists!`
        setTimeout(() => { alert.setAttribute('hidden', '') }, 3000)
    }
}