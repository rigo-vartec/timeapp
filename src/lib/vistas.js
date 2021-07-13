module.exports={
    isLoggenIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('info' ,'Debes Iniciar Sesion');
        return res.redirect('/login');
    },

    isNotLoggenIn(req, res, next){
        if(!req.isAuthenticated()){
            return next();
        }
        return res.redirect('/logout');
    }
};

