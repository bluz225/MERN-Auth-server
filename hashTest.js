const bcrypt = require("bcrypt")

const hashTest = async () =>{
    try {
        // test hashing 
        const password = "hello"
        const salt = 12
        const hashedPassword = await bcrypt.hash(password,salt)
        console.log(hashedPassword)

        const matchPassword = await bcrypt.compare("goodbye", hashedPassword)
        console.log(matchPassword)

    } catch (error) {
        console.warn(error)
    }
}

hashTest()