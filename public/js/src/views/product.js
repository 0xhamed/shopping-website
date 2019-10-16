
export const productHtml = (product) => {
    return `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div class="product-grid">
                <div class="product-image">
                <img class="pic-1" src="${product.image}">
                </div>
                <div class="product-content">
                    <h3 id="name">${product.name}</h3>
                    <div class="price">$<i id="price">${product.price}</i>
                      ${product.dprice ? `<span>${product.dprice}</span>` : ``}
                    </div>
                </div>
                <ul class="social" _id="${product._id}">
                    <li><a href="/products/${product._id}" data-tip="View""><i class="fa fa-search"></i></a></li>
                    <li><a onclick="addToWishList(this)" data-tip="Add to Wishlist"><i class="fa fa-star"></i></a></li>
                    <li><a onclick="addToCart(this)" data-tip="Add to Cart">
                        <i class="fa fa-shopping-cart"></i></a></li>
                </ul>
            </div>
        </div>
     `
}
