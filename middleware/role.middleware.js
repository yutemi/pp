const jwt = require("jsonwebtoken")
const config = require("config")

module.exports = function(role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            return next()
        }
        try {
            const token = req.headers.authorization.split(" ")[1]
            if (!token) {
                return res.status(401).json({message: "Не авторизован"})
            }
            const decoded = jwt.verify(token, config.get("jwtSecret"))

            if (decoded.role === role || decoded.role === "MANAGER") {
                req.user = decoded;

                return next()

            }
            return res.status(403).json({message: "Нет доступа"})
        } catch (e) {
            
            console.log(e)
            res.status(401).json({message: "Не авторизован"})
        }
    };
}



