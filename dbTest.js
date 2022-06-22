const db = require("./models")

db.User.create({
        name: "test-boi",
        email: "boi@test.com",
        password: "imfaf"
    })
    .then(user=>{
        console.log("im fast a fuhhh boiiii", user)
    })
    .catch(console.log)