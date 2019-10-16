
module.exports = (req, res, next) => {
    const session = req.session
    const locals = res.locals
    session.meta = session.meta ? session.meta : { count: 0 }
    const { success, errorM } = req.session.meta

    locals.loggedIn = session.user ? true : null
    locals.success = success ? success : null
    locals.errorM = errorM ? errorM : null

    const meta = session.meta

    if (meta.count === 0 && meta.path === req.path) meta.count++
    else if
        (meta.path === req.path) {
        if (meta.success) delete meta.success
        if (meta.errorM) delete meta.errorM
        delete meta.path
        meta.count = 0
    }

    // console.log( session.meta.path === req.path, ' sPath ', session.meta.path, ' rPath ', req.path)

    next()
}