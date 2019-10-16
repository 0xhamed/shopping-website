module.exports = (req, res, next) => {
    if (req.session.user) next()
    else {
        req.session.meta.errorM = 'Please login first!'
        req.session.meta.path = '/auth/login'
        return res.redirect('/auth/login')
    }
}