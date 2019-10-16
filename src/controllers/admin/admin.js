const { User } = require('../../models/user')

// GET /
module.exports.getAdmin = async (req, res) => {
    res.render('admin', { role: req.session.user.role })
}

// GET /view
module.exports.getAdminView = async (req, res) => {
    const user = await User.findById(req.session.user._id)
    user.password = null
    res.send({ data: user })
}