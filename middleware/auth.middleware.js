const jwt = require("jsonwebtoken")
const config = require("config")

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        
        const decoded = jwt.verify(token, config.get("jwtSecret"))
        req.user = decoded
        return next()   
    } catch (e) {
        console.log(e)
        return res.status(401).json({message: "не авторизован"})
    }
}