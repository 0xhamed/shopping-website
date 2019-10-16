import {
    setInputs, mapInputs,
    resetModal, listener, sForm
} from '../../utils/forms.js'

import { pageNHtml } from '../../views/page.js'
import { request } from '../../utils/request.js'
import { productRow } from '../../views/productRow.js'
import { pagination } from '../../utils/pagination.js'
import { readFile } from '../../utils/readFile.js'


export class Product {
    constructor() {
        window.addProduct = this.addProduct
        window.getProducts = this.getProducts
        window.editProduct = this.editProduct
        window.addProduct = this.addProduct
        window.removeProduct = this.removeProduct
    }

    // GET /product
    async getProducts() {
        const productsTB = document.querySelector('#products-table-body')
        await pagination('/admin/product', productsTB, productRow, pageNHtml)
    }

    // POST /product
    addProduct() {
        const imageInput = document.querySelector('#add-product-form [name=image]')
        const output = { imageData: null, changed: null }
        readFile(imageInput, output)

        const cb = async (e) => {
            sForm(e)

            const data = { name: null, price: null, dprice: null, description: null }
            mapInputs('#add-product-form [name]', data)

            data.image = output.imageData

            const product = await request('/admin/product', 'POST', data)
            const productsTB = document.querySelector('#products-table-body')
            if (product) productsTB.insertAdjacentHTML('afterbegin', productRow(product))

            resetModal(e, cb)
        }
        listener('#add-product-form', 'submit', cb)
    }

    // GET /product/:id &&  PATCH /product/:id
    async editProduct(self) {
        const product = await request(`admin/product/${self.getAttribute('_id')}`)
        if (product) {
            $('#edit-product-modal').modal('show')
            setInputs('#edit-product-form [name]', product)

            const imageInput = document.querySelector('#edit-product-form [name=image]')
            const output = { imageData: null, changed: null }
            readFile(imageInput, output)

            const cb = async (e) => {
                sForm(e)

                const data = { name: null, price: null, dprice: null, image: null, description: null }
                mapInputs('#edit-product-form [name]', data)

                if (output.changed) data.image = { imageData: output.imageData, changed: true }
                else data.image = imageInput.textContent

                const product = await request(`admin/product/${self.getAttribute('_id')}`, 'PATCH', data)
                if (product)
                    self.parentNode.parentNode.innerHTML = productRow(product)

                resetModal(e, cb)
            }
            listener('#edit-product-form', 'submit', cb)
        }
    }

    // DELETE /product/:id    
    async removeProduct(self) {
        if (confirm('are you sure?')) {
            const done = await request(`admin/product/${self.getAttribute('_id')}`, 'DELETE')
            if (done) self.parentNode.parentNode.remove()
        }
    }
}