require("dotenv").config()
require("./models")

// required packages
const express = require("express")
const cors = require("cors")

// app config/middleware
const app = express()
const PORT = process.env.PORT || 9000
app.use(cors())
app.use(express.json()) // json req.bodies

// app.use((req,res,next) => {
//     console.log("hello I am a middleware")
//     res.locals.myData = "I am Data that is passed out of the middle ware"

//     // tell express to moveon to the next thing
//     next()
// })

const myMiddleWare = (req,res,next) => {
    console.log("hello I am a middleware")
    res.locals.myData = "I am Data that is passed out of the middle ware"

    // tell express to moveon to the next thing
    next()
}

//routes and controllers
app.get("/", myMiddleWare, (req,res)=>{
    res.json({msg: "hitting it from the back"})
    console.log(res.locals.myData)
})

app.use("/api-v1/users", require("./controllers/api-v1/users"))

// listen on a port
app.listen(PORT, ()=>{
    console.log(`IS IT OVER ${PORT}?`)
})