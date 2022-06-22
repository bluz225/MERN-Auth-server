const jwt = require("jsonwebtoken")
const db = require("../../models")

const authLockedRoute = async (req,res,next) => {
    try {
        // jwt from the client sent in the header
        const authHeader = req.headers.authorization
        // decode the jwt -- will throw to the catch if the signature is invalid
        const decode = jwt.verify(authHeader, process.env.JWT_SECRET)
        // find the user in the db that sent the jwt
        const foundUser = await db.User.findById(decode.id)
        // mount the user on the res.locals so the downstream route has the logged in user
        res.locals.user = foundUser
        next()
    } catch (error) {
        console.warn(error)
        //this means there is an authentication error 
        res.status(401).json({msg:"unauthorization failed"})
    }

}

module.exports = authLockedRoute