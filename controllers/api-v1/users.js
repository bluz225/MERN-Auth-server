// require("dotenv").config()
const bcrypt = require("bcrypt")
const router = require("express").Router()
const db = require("../../models")
const jwt = require("jsonwebtoken")
const authLockedRoute = require("./authLockedRoute")

// POST /users/register -- CREATE a new users
router.post("/register", async (req,res)=>{
    // res.json({msg: "register a user"})
    try {
        // check if the user exists already
        const findUser = await db.User.findOne({
            email:req.body.email
        })

        // disallow users from registering twice
        if (findUser) {
            // stop the route and send a response saying the user exists
            return res.status(400).json({msg: "email already exists"})
        }

        // if the user is allowed to register, hash the user's password
        const password = req.body.password
        const salt = 12
        const hashedPassword = await bcrypt.hash(password,salt)
        
        // create a new user, with the hashed password
        const newUser = new db.User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        await newUser.save()
        console.log(newUser)

        // sign the user in by sending a valid jwt back
        
        // create the jwt payload
        const payload = {
            name: newUser.name,
            email: newUser.email,
            id: newUser.id
        }
        
        // sign the token and send it back
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1d"}) // expires in 1 day
        res.json({token})

    } catch (error) {
        console.warn(error)
        // handle validation errors
        if (error.name === "ValidateError") {
            res.status(400).json({msg: error.message})
        } else {
            // handle all other errors
            res.status(500).json({msg: "server error 500"})
        }
    }
})

// POST /users/login -- validate login credentials
router.post("/login", async (req,res)=>{
    try {
       // res.json({msg: "login a user"})
    // all the data will come in req.body

    const user = await db.User.findOne({
        email: req.body.email
    })
    // console.log(user)
    // if the user is not found, return send a status of 400 and let the user know login failed.
    if (!user) {
        return res.status(400).json({msg:"Email Not found, please register a new account"})
    }

    //compare supplied password against the hashed password in the database
    const matchedpassword = await bcrypt.compare(req.body.password, user.password)
    console.log(matchedpassword)
    // if they do not match, return and let the user know the login has failed
    if (!matchedpassword) {
        return res.status(400).json({msg:"Incorrect Email or Password"})
    }
    
    // create a jwt payload
    const payload = {
        name: user.name,
        email: user.email,
        id: user.id
    }

    // sign the jwt and send it back
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1d"}) // expires in 1 day
    res.json({token})

    // dont forget to handle your errors  
    } catch (error) {
        console.log(error)
        // handle all other errors
        res.status(500).json({msg: "server error 500"})
    }  
})

// GET /auth-locked -- checks user credentials and only send back privlaged info if the user is logged in
router.get("/auth-locked", authLockedRoute, (req,res)=>{
    console.log(res.locals.user)
    res.json({msg: "auth-locked"})
})

module.exports = router