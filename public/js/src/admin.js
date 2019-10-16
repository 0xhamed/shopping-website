import { Product } from './controllers/admin/product.js'
import { User } from './controllers/admin/user.js'
import { Order } from './controllers/admin/order.js'
import { request } from './utils/request.js'
import { adminV } from './views/admin.js'

document.onload = (async () => {
    const user = await request('/admin/view')
    document.querySelector('.loading').insertAdjacentHTML('afterend', adminV(user))

    new Product(), new User(), new Order()

    document.querySelector('.loading').classList.add('d-none')
    document.querySelector('#page-container').classList.remove('d-none')
})()
