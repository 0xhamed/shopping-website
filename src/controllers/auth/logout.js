const Session = require('../../models/session')

// GET /logout
module.exports = async (req, res) => {
    if (req.session.user)
        await Session.deleteMany({ session: new RegExp(req.session._id) })

    res.redirect('/')
}