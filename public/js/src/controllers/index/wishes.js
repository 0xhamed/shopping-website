
import { request } from '../../utils/request.js'
import { wishRow } from '../../views/wishRow.js'

export class Wish {

    constructor() {
        window.removeItem = this.removeItem.bind(this)
    }

    // GET /wishList
    async getWishList() {
        const wishes = await request('/wishes/wishList')
        document.querySelector('#wishes-table-body').innerHTML = ''
        wishes.forEach(wish => {
            document.querySelector('#wishes-table-body').insertAdjacentHTML('beforeend', wishRow(wish))
        })

    }

    getLocalWishList() {
        const serWishes = localStorage.getItem('wishes')
        if (!serWishes) return;
        const wishes = JSON.parse(serWishes)
        wishes.forEach(wish => {
            document.querySelector('#wishes-table-body').insertAdjacentHTML('beforeend', wishRow(wish))
        })
    }


    // DELETE /:id
    async removeItem(self) {
        if (document.querySelector('#loggedIn')) {
            const done = await request(`/wishes/${self.getAttribute('_id')}`, 'DELETE')
            if (!done) return;
            self.parentNode.parentNode.remove()
        }
        else {
            const wishes = JSON.parse(localStorage.getItem('wishes'))
            const newWishes = wishes.filter(wish => wish._id !== self.getAttribute('_id'))
            localStorage.setItem('items', JSON.stringify(newWishes))
            self.parentNode.parentNode.remove()
        }
    }
}