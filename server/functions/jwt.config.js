const jwt = require("jsonwebtoken")
const secretKey = process.env.SECRET_KEY;
const expiresIn = process.env.EXPIRES_IN;

const encodeJWT = (payload)=>{
try {
    return jwt.sign(payload,secretKey,{expiresIn})
} catch (error) {
    console.log("\n[!] Error While Creating JWT Token -- ", error.message)
    return null
}
}
const decodeJWT = (token)=>{
    try {
        return jwt.verify(token,secretKey)
    } catch (error) {
        console.log("\n[!] Error While Decoding JWT ",error.message)
        return null
    }
}

module.exports = {encodeJWT,decodeJWT}