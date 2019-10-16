
export const cartRow = (item) => {
    return `
     <tr class="cart-item">
        <td><a href="/products/${item.product._id}">${item.product.name}</a></td>
        <td></td>
        <td>$<span class="price">${parseFloat(item.product.price).toFixed(2)}</span></td>
        <td><input class="text-center quantity" type="number" min="0" value="${item.quantity}"></td>
        <td>$<span class="total">${parseFloat(item.quantity * item.product.price).toFixed(2)}</span></td>
        <td><button class="btn btn-danger" onclick="removeItem(this)" _id="${item.product._id}">
            <i class="fa fa-trash"></i></button></td>
    </tr> 
    `
}