
export const wishRow = (wish) => {
    console.log(wish)
    return `
     <tr class="wish-item">
        <td><a href="/products/${wish.wish._id}"><span id="name">${wish.wish.name}</span></a></td>
        <td></td>
        <td>$<span id="price">${wish.wish.price}</span></td>
        <td><button class="btn btn-primary" onclick="addToCartv3(this)" _id="${wish.wish._id}">
           Add To Cart</button></td>
        <td><button class="btn btn-danger" onclick="removeItem(this)" _id="${wish.wish._id}">
            <i class="fa fa-trash"></i></button></td>
    </tr> 
    `
}