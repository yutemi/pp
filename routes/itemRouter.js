const {Router} = require("express")
const router = Router()
const itemController = require("../controllers/itemController")
const checkRoleMiddleware = require("../middleware/role.middleware")

router.post("/add", checkRoleMiddleware("MANAGER"),  itemController.addItem)
router.post("/edit", checkRoleMiddleware("WORKER"), itemController.editItem)
router.get("/", itemController.getAll)
router.get("/:id", itemController.getOne)

module.exports = router