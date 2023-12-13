const {Router} = require("express")
const router = Router()
const cartController = require("../controllers/cartController")
const authMiddleware = require("../middleware/auth.middleware")

router.get("/", authMiddleware, cartController.getCart)
router.post("/add/:id", authMiddleware, cartController.addItem)
router.delete("/del/:id", authMiddleware, cartController.deleteItem)

module.exports = router