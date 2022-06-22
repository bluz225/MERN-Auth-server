const jwt= require("jsonwebtoken")

// tokens that are not verified will throw an error to the catch

try {
    // create a jwt payload (info you want to encode in the token)
    // user data from the db
    const payload = {
        name: "testBoi",
        email: "test@boi.com",
        id: "ID CUR"
    }
    // this is a jwt
    // part 1: how jwt is encoded
    // part 2: the encoded payload
    // part 3: signature we created with the secret
    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdEJvaSIsImVtYWlsIjoidGVzdEBib2kuY29tIiwiaWQiOiJJRCBDVVIiLCJpYXQiOjE2NTU5MjQxODUsImV4cCI6MTY1NTkzMDE4NX0.Bkb6s7rcd71jmvpvXyGAf7tn0ySiYWkVNLzRjJ19KkI
    
    // sign and encode our jwt payload
    // jwt.sign (data to encode, secret to sign with, options obj)
    const secret = "my super duper big secret"
    const token = jwt.sign(payload,secret, {expiresIn: 60*100})
    console.log(token)

    const decode = jwt.verify(token,secret)
    console.log(decode)
} catch (error) {
    console.warn(error)
}