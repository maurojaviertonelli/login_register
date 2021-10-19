function userLoggedMiddleware(req, res, next) {
    
    res.locals.isLogged = false;

    if(!req.session.userLogged  || req.session.userLogged.rol==admin){
        return res.redirect('/');
    }

    next();
}

module.exports = userLoggedMiddleware;