import { Cart } from "./controllers/index/cart.js";

window.onload = (async () => {
    const cart = new Cart()
    if (document.querySelector('#loggedIn')) await cart.getCartItems()
    else cart.getLocalCartItems()
    cart.cartFunc()
    document.querySelector('.loading').classList.add('d-none')
    document.querySelector('.table').classList.remove('d-none')
})()