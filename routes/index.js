const Router = require("express")
const router = new Router()
const userRouter = require("./userRouter")
const itemRouter = require("./itemRouter")
const cartRouter = require("./cartRouter")

router.use("/user", userRouter)
router.use("/item", itemRouter)
router.use("/cart", cartRouter)

module.exports = router
