import { Wish } from "./controllers/index/wishes.js";
import { Products } from "./controllers/index/products.js";

window.onload = (async () => {
    const wish = new Wish()
    if (document.querySelector('#loggedIn')) await wish.getWishList()
    else wish.getLocalWishList()
    new Products()
    document.querySelector('.loading').classList.add('d-none')
    document.querySelector('.table').classList.remove('d-none')
})()