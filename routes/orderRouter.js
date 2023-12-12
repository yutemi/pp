const {Router} = require("express")
const router = Router()
const orderController = require("../controllers/orderController")
const authMiddleware = require("../middleware/auth.middleware")

router.get("/orders", authMiddleware, orderController.getOrders)

module.exports = router