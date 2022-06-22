require("dotenv").config()

const mongoose = require("mongoose")

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1/mernAuth"

mongoose.connect(MONGODB_URI)

const db = mongoose.connection

db.once("open", ()=>{
    console.log(`connected to Mongo DB @ ${db.host}:${db.port}`)
})

db.on("error", error =>{
    console.warn("db error:",error)
})

module.exports = {
    User: require("./user")
}