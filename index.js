require("dotenv").config()
require("./models")

// required packages
const express = require("express")
const cors = require("cors")

// app config
const app = express()
const PORT = process.env.PORT || 9000
app.use(cors())
app.use(express.json()) // json req.bodies


//routes and controllers
app.get("/", (req,res)=>{
    res.json({msg: "hitting it from the back"})
})

// listen on a port
app.listen(PORT, ()=>{
    console.log(`IS IT OVER ${PORT}?`)
})