const {Router} = require("express")
const router = Router()

const auth = require("../middleware/auth.middleware")
const cart = require("../models/Cart")


router.get('/', auth, async (req, res) => {
    const user = req.user
    const {itemId} = req.body
    const basket = await cart.create({basketId : user.id, deviceId : deviceId})
    return res.json(basket)
})
router.post('/', auth, async (req, res) => {
    const {id} = req.user
    const basket = await cart.findAll({include: {
            model: Device
        }, where: {basketId: id}})

    return res.json(basket)
})