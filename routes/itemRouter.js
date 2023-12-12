const {Router} = require("express")
const router = Router()
const itemController = require("../controllers/itemController")
// const checkRole = require("../middleware/checkRoleMiddleware")

// router.post()
router.get("/", itemController.getAll)
router.get("/:id", itemController.getOne)

module.exports = router