import {
    setInputs, mapInputs,
    resetModal, listener, sForm
} from '../../utils/forms.js'

import { request } from '../../utils/request.js'
import { userRow } from '../../views/userRow.js'
import { pageNHtml } from '../../views/page.js'
import { pagination } from '../../utils/pagination.js'

export class User {
    constructor() {
        window.getUsers = this.getUsers
        window.addUser = this.addUser
        window.editUser = this.editUser
        window.removeUser = this.removeUser
        window.getProfile = this.getProfile
        window.editProfile = this.editProfile
        window.getAddress = this.getAddress
    }

    // GET /user
    async getUsers() {
        const userTB = document.querySelector('#users-table-body')
        await pagination('/admin/user', userTB, userRow, pageNHtml)
    }

    // GET /user/:id
    async getProfile(btn) { // warn
        document.querySelector('#profile').classList.add('d-none')
        document.querySelector('.loading').classList.remove('d-none')

        document.querySelector('.pagination').classList.add('d-none')
        const user = await request(`/admin/user/${btn.getAttribute('_id')}`)
        if (user) setInputs('#profile-form [name]', user)

        document.querySelector('.loading').classList.add('d-none')
        document.querySelector('#profile').classList.remove('d-none')

    }

    // POST /user
    addUser() {
        const cb = async (e) => {
            sForm(e)
            const data = { name: null, email: null, password: null, cpassword: null, role: null }
            mapInputs('#add-user-form [name]', data)

            const user = await request('/admin/user', 'POST', data)

            const userTB = document.querySelector('#users-table-body')
            if (user) userTB.insertAdjacentHTML('afterbegin', userRow(user))
            resetModal(e, cb)
        }
        listener('#add-user-form', 'submit', cb)
    }

    // GET /user/:id && PATCH /user/:id
    async editUser(btn) {
        const user = await request(`admin/user/${btn.getAttribute('_id')}`)
        if (user) {
            $('#edit-user-modal').modal('show')
            setInputs('#edit-user-form [name]', user)

            const cb = async (e) => {
                sForm(e)
                const data = { name: null, email: null, role: null }
                mapInputs('#edit-user-form [name]', data)
                const user = await request(`admin/user/${btn.getAttribute('_id')}`, 'PATCH', data)
                if (user) btn.parentNode.parentNode.innerHTML = userRow(user)
                resetModal(e, cb)
            }
            listener('#edit-user-form', 'submit', cb)
        }
    }

    // PATCH /user/:id
    editProfile(btn) {
        const cb = async (e) => {
            sForm(e)
            const data = { name: null, email: null, password: null, newPassword: null, cpassword: null }
            mapInputs('#profile-form [name]', data)
            const user = await request(`admin/user/${btn.getAttribute('_id')}`, 'PATCH', data)
            if (user) setInputs('#profile-form [name]', user)
            if (!user) document.querySelector('#profile-form').reset()
            e.target.querySelector('[type=submit]').disabled = false
        }
        listener('#profile-form', 'submit', cb)
    }

    // GET /user/:id && PUT /user/:id
    async getAddress(btn) {
        const user = await request(`/admin/user/${btn.getAttribute('_id')}`)
        if (user.address) setInputs('#address-form [name]', user.address)

        const cb = async (e) => {
            sForm(e)
            const data = { name: null, street: null, city: null, zip: null, country: null }
            mapInputs('#address-form [name]', data)
            await request(`admin/user/${btn.getAttribute('_id')}`, 'PUT', data)
            resetModal(e, cb)
        }
        listener('#address-form', 'submit', cb)
    }

    // DELETE /user/:id
    async removeUser(btn) {
        if (confirm('are you sure?')) {
            const done = await request(`admin/user/${btn.getAttribute('_id')}`, 'DELETE')
            if (done) btn.parentNode.parentNode.remove()
        }
    }
}