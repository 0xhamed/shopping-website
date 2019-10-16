import { request } from '../../utils/request.js'

// POST /login
export const login = () => {
    document.querySelector('#login-form').addEventListener('submit', async (e) => {
        e.preventDefault()
        e.target.classList.add('d-none')
        document.querySelector('.loading').classList.remove('d-none')

        const email = document.querySelector('[name=email]').value
        const password = document.querySelector('[name=password]').value
        const stayLogged = document.querySelector('[name=stayLogged]').checked

        let localCartItems
        if (localStorage.getItem('items'))
            localCartItems = JSON.parse(localStorage.getItem('items'))

        let localWishList
        if (localStorage.getItem('wishes'))
            localWishList = JSON.parse(localStorage.getItem('wishes'))

        const data = { email, password, stayLogged, localCartItems, localWishList }

        const notDone = await request('/auth/login', 'POST', data)

        if (notDone && !notDone.includes('http')) {
            document.querySelector('[name=password]').value = ''
            document.querySelector('.loading').classList.add('d-none')
            return e.target.classList.remove('d-none')
        }

        localStorage.removeItem('items')
        localStorage.removeItem('wishes')
    })
}
