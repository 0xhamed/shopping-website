const { User, validate, validateAddress } = require('../../models/user')
const Order = require('../../models/order')
const Session = require('../../models/session')
const bcrypt = require('bcryptjs')

// GET /user/:id
module.exports.getUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    user.password = undefined
    res.send({ data: user })
}

// GET /user
module.exports.getUsers = async (req, res) => {
    const usersCount = await User.countDocuments()
    const users = await User.find().sort('-_id').skip(parseInt((req.query.page) - 1) * 5).limit(5)
    res.send({ data: { users, pages: Math.ceil(usersCount / 5) } })
}

// POST /user
module.exports.addUser = async (req, res) => {
    const exists = await User.findOne({ email: req.body.email })
    if (exists) return res.status(406).send({ meta: { errorM: 'Email already in use.' } })

    if (req.body.password !== req.body.cpassword)
        return res.status(406).send({ meta: { errorM: 'Password and Confirm Password are no match.' } })

    const incPassword = await bcrypt.hash(req.body.password, 10)
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: incPassword,
        role: req.body.role
    })
    user.password = undefined
    res.send({ data: user, meta: { success: 'Created Succeffully' } })
}

// PATCH /user/:id
module.exports.editUser = async (req, res) => {
    const body = req.body
    const session = req.session

    const user = await User.findById(req.params.id)

    if (session.user.role !== 'admin') {
        const { error } = validate(body)
        if (error) return res.status(400).send({ meta: { errorM: error.message } })
    }

    if (user.email !== body.email) {
        const exists = await User.findOne({ email: body.email })
        if (exists) return res.status(406).send({ meta: { errorM: 'Email already in use' } })
    }

    user.name = body.name
    user.email = body.email

    if (session.user.role === 'admin' && body.role) { //admin editing someone
        user.role = body.role
        userId = new RegExp(req.params.id)
        const sessionDoc = await Session.findOne({ session: userId })
        if (sessionDoc) {
            const userSession = JSON.parse(sessionDoc.session)
            userSession.user = user
            const newUserSession = JSON.stringify(userSession)
            await Session.updateOne({ session: userId }, { $set: { session: newUserSession } })
        }
    }
    else { // someone editing himself
        if (!(await bcrypt.compare(body.password, user.password)))
            return res.status(401).send({ meta: { errorM: 'Invalid password' } })

        if (body.newPassword) {
            if (body.newPassword !== body.cpassword)
                return res.status(400).send({ meta: { errorM: 'Confirm password must match New Password' } })
            const incPassword = await bcrypt.hash(body.newPassword, 10)
            user.password = incPassword
        }
        session.user = user
        session.save()
    }

    await user.save()
    user.password = undefined
    res.send({ data: user, meta: { success: 'Edited Successfully' } })
}

// PUT /user/:id
module.exports.addAddress = async (req, res) => {
    const { value, error } = validateAddress(req.body)
    if (error) return res.status(400).send({ meta: { errorM: error.message } })

    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).send({ meta: { errorM: 'User wasn\'t found' } })

    user.address = value
    req.session.user = user
    req.session.save()
    await user.save()
    res.send({ meta: { success: 'Changes have been made Successfully' } })
}

//DELETE /user/:id
module.exports.removeUser = async (req, res) => {
    await User.deleteOne({ _id: req.params.id })
    await Order.deleteMany({ user: req.params.id })
    await Session.deleteMany({ session: new RegExp(req.params.id) })
    res.send({ data: 'done', meta: { success: 'Deleted Successfully' } })
}
