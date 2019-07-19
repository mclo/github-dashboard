let jwt = require('jsonwebtoken')

module.exports  = verifyLogin = (req, res, next) => {
    let cookieJwt = req.cookies.authorization
    if(!cookieJwt){
        res.status(401)
        return next(new Error('user not authorized'))
    }

    try {
        let decoded = jwt.verify(cookieJwt, process.env.JWT_SECRET)
        
        if(!req.user){
            res.status(401)
            return next()
        }

        if(decoded.data.userId !== req.user.id){
            res.status(403)
            return next(new Error('invalid jwt'))
        }
        return next()
    }
    catch(e){ 
        res.clearCookie('authorization', { 
            httpOnly: true, 
            secure: true
        })
        res.status(401)
        return next(e)
    } 
}