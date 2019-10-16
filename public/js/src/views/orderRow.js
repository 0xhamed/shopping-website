
export const orderRow = (order) => {

    const addressObj = order.user.address
    const address = `${addressObj.name}, ${addressObj.street}, 
    ${addressObj.city}, ${addressObj.zip}, ${addressObj.country}`

    let productsNames = ''
    order.products.forEach(item => productsNames += `${item.product.name}(${item.quantity}), `)

    const role = document.querySelector('#role').value
    if (role === 'admin' || role === 'mod') return `
        <tr>
            <td>${productsNames}</td>
            <td>${order._id}</td>
            <td>${order.paymentId}</td>
            <td>$${order.total}</td>
            <td>${order.user.email}</td>
            <td>${address}</td>
            <td>${order.status}</td>
            <td><select name="status" class="btn btn-secondary" onclick=editOrder(this) _id="${order._id}">
            <option ${order.status === 'pending' ? 'selected' : ''} value="pending">pending</option>
            <option ${order.status === 'paid' ? 'selected' : ''} value="paid">paid</option>
            <option ${order.status === 'shipped' ? 'selected' : ''} value="shipped">shipped</option>
            <option ${order.status === 'canceled' ? 'selected' : ''} value="canceled">canceled</option>
            </select>
            </td>
        </tr>
    `
    else return `
        <tr>
            <td>${productsNames}</td>
            <td>${order._id}</td>
            <td>$${order.total}</td>
            <td>${address}</td>
            <td>${order.status}</td>
        </tr>
   `
}