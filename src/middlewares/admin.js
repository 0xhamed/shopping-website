
// permissions :
// admin => full
// mod => / && /product && /order
// user => / && himself /user/:id

module.exports = (req, res, next) => {
  const session = req.session
  if (session.user)

    if (req.path === '/' || req.path === '/view') next() // user access to admin index

    else if (session.user._id === req.params.id || session.user.role === 'admin')
      next() // user access to /user/:id "himself" && admin full access

    else if ((req.path.includes('/product') || req.path.includes('/order')) &&
      session.user.role === 'mod')
      next() // mod access to /product and /order

    else res.status(403).send('<h1> Forbidden! </h1>')

  else {
    session.meta.errorM = 'Please Login in first!'
    session.meta.path = '/auth/login'
    res.redirect('/auth/login')
  }
}
