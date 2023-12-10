const {Router} = require("express")
const User = require("../models/User")
const router = Router()

router.post("/register", async(req, res) => {
    try {
        const {email, pass} = req.body
    } catch (error) {
        res.status(500).json({message: "pizda"})
    }
})

router.post("/login", async(req, res) => {

})

module.exports = router