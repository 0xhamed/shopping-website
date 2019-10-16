
import { request } from '../../utils/request.js'
import { cartRow } from '../../views/cartRow.js'

export class Cart {

    constructor() {
        window.checkout = this.checkout
        window.removeItem = this.removeItem.bind(this)
    }

    // GET /items
    async getCartItems() {
        const items = await request('/cart/items')
        document.querySelector('#cart-table-body').innerHTML = ''
        items.forEach(item => {
            document.querySelector('#cart-table-body').insertAdjacentHTML('beforeend', cartRow(item))
        })
        this.cartTotal()
    }

    getLocalCartItems() {
        const serItems = localStorage.getItem('items')
        if (!serItems) return;
        const items = JSON.parse(serItems)
        items.forEach(item => {
            document.querySelector('#cart-table-body').insertAdjacentHTML('beforeend', cartRow(item))
        })
        this.cartTotal()
    }

    cartFunc() {
        Array.from(document.querySelectorAll('.quantity')).forEach(elm => {
            elm.addEventListener('input', (e) => {
                let quanVal = parseInt(e.target.value)
                if (isNaN(quanVal) || quanVal < 0) {
                    e.target.value = 0
                    quanVal = 0
                }
                const parent = e.target.parentNode.parentNode
                const price = parent.querySelector('.price').textContent
                parent.querySelector('.total').textContent = parseFloat(quanVal * price).toFixed(2)
                this.cartTotal()
            })
        })
    }

    cartTotal() {
        let total = 0
        Array.from(document.querySelectorAll('.total'))
            .forEach(elm => { total += parseFloat(elm.textContent) })
        document.querySelector('.cart-total').textContent = parseFloat(total).toFixed(2)
    }

    // DELETE /:id
    async removeItem(self) {
        if (document.querySelector('#loggedIn')) {
            const done = await request(`/cart/${self.getAttribute('_id')}`, 'DELETE')
            if (!done) return;
            self.parentNode.parentNode.remove()
            this.cartTotal()
        }
        else {
            const items = JSON.parse(localStorage.getItem('items'))
            const newItems = items.filter(item => item.product._id !== self.getAttribute('_id'))
            localStorage.setItem('items', JSON.stringify(newItems))
            self.parentNode.parentNode.remove()
            this.cartTotal()
        }
    }

    // POST ../checkout
    async checkout() {
        document.querySelector('.table').classList.add('d-none')
        document.querySelector('.loading').classList.remove('d-none')
        const order = []
        Array.from(document.querySelectorAll('.cart-item')).forEach(item => {
            const _id = item.querySelector('[_id]').getAttribute('_id')
            const quantity = item.querySelector('.quantity').value
            order.push({ product: _id, quantity })
        })

        if (order[0]) {
            const strOrder = JSON.stringify(order)
            document.querySelector('[name=items]').value = strOrder
            document.querySelector('#checkout-form').submit()
        }
    }
}