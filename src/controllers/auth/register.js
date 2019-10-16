const { User, validate } = require('../../models/user')
const bcrypt = require('bcryptjs')

//GET /register
module.exports.getRegister = (req, res) => {
    res.render('register', { name: null, email: null })
}

//POST /register
module.exports.postRegister = async (req, res) => {
    const { value, error } = validate(req.body)
    if (error) return res.status(400).send({ data: 'not done', meta: { errorM: error.message } })

    const exists = await User.findOne({ email: value.email })
    if (exists) return res.status(406).send({ data: 'not done', meta: { errorM: '"Email" is already in use!' } })

    if (req.body.password !== req.body.cpassword)
        return res.status(406).send({ data: 'not done', meta: { errorM: '"Password" and "Confirm Password" must match' } })

    const incPassword = await bcrypt.hash(value.password, 10)
    value.password = incPassword

    await User.create(value)
    req.session.meta.success = 'Account has been created successfuly you can login now.'
    req.session.meta.path = '/login'

    res.redirect('/auth/login')

}
