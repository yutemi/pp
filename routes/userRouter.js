const Router = require("express")
const router = new Router()
const userController = require("../controllers/userController")
const authMiddleware = require("../middleware/auth.middleware")
const {check} = require("express-validator")

router.post("/register",[
    check("email", "некорр email").isEmail(),
    check("passw", "длина 7 символов").isLength({min: 1})
], userController.registration)
router.post("/login",[
    check("email", "некорр email").isEmail(),
    check("passw", "введите пароль").exists()
], userController.login)
router.get("/auth", authMiddleware, userController.check)

module.exports = router
