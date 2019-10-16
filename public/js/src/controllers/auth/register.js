import { request } from '../../utils/request.js'
import { mapInputs } from '../../utils/forms.js'

// POST /register
export const register = () => {
    document.querySelector('#register-form').addEventListener('submit', async (e) => {
        e.preventDefault()
        e.target.classList.add('d-none')
        document.querySelector('.loading').classList.remove('d-none')

        const data = { name: null, email: null, password: null, cpassword: null }
        mapInputs('#register-form [name]', data)

        const notDone = await request('/auth/register', 'POST', data)

        if (notDone && !notDone.includes('http')) {
            document.querySelector('[name=password]').value = ''
            document.querySelector('[name=cpassword]').value = ''
            document.querySelector('.loading').classList.add('d-none')
            e.target.classList.remove('d-none')
        }
    })
}
