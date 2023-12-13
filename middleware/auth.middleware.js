const jwt = require("jsonwebtoken")
const config = require("config")

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next()
    }

    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        
        const decoded = jwt.verify(token, config.get("jwtSecret"))
        req.token = token
        req.user = decoded
        return next()        
    } catch (e) {
        console.log(e)
        return res.status(401).json({message: "не авторизован"})
    }
}