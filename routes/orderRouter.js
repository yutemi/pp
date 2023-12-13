const {Router} = require("express")
const router = Router()
const orderController = require("../controllers/orderController")
const authMiddleware = require("../middleware/auth.middleware")
const checkRoleMiddleware = require("../middleware/role.middleware")


router.post("/create", authMiddleware, orderController.createOrder)
router.get("/", authMiddleware, orderController.getOrders)
router.get("/all", checkRoleMiddleware("WORKER"), orderController.getAllOrders)
router.post("/edit", checkRoleMiddleware("WORKER"), orderController.editOrderStatus)

module.exports = router