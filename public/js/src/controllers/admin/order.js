import { pagination } from '../../utils/pagination.js'
import { orderRow } from '../../views/orderRow.js'
import { pageNHtml } from '../../views/page.js'
import { request } from '../../utils/request.js'

export class Order {
    constructor() {
        window.getOrders = this.getOrders
        window.editOrder = this.editOrder
    }

    // GET /order
    async getOrders() {
        const ordersTB = document.querySelector('#orders-table-body')
        await pagination('/admin/order', ordersTB, orderRow, pageNHtml)
    }

    // PATCH /order/:id
    async editOrder(self) {
        const firstValue = self.value

        const cb = async (e) => {
            if (firstValue !== e.target.value) {
                await request(`/admin/order/${e.target.getAttribute('_id')}`, 'PATCH', { status: e.target.value })
            }
            self.removeEventListener('input', cb)
        }

        self.addEventListener('input', cb)
    }
}