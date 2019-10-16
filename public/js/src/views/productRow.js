
export const productRow = (product) => {
    return `
         <tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.date}</td>
            <td><button class="btn btn-info" data-toggle="modal" 
                data-target="#edit-product-modal" _id="${product._id}" 
                onclick="editProduct(this)"><i class="fa fa-cogs"></i></button></td>
            <td><button class="btn btn-danger" _id="${product._id}" 
                onclick="removeProduct(this)"><i class="fa fa-trash"></i></button></td> 
        </tr>
        `
}
