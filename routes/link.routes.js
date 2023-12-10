const {Router} = require("express")
const config = require("config")
const shortId = require("shortid")
const Link = require("../models/Link")
const auth = require("../middleware/auth.middleware")
const router = Router()

router.post("/generate", auth, async (req, res) => {
    try {
        const baseUrl = config.get("baseUrl")
        const {from} = req.body

        const code = shortId.generate()

        const exist = await Link.findOne({from})

        if (exist) {
            return res.json({link: exist})
        }

        const to = baseUrl = "/t/" + code

        const link = new Link({
            code, to, from, owner: req.user.userId
        })

        await link.save()

        res.status(201).json({link})

    } catch (error) {
        return res.status(500).json({message: "?"})
    }
})

router.get("/", auth, async (req, res) => {
    try {
        const links = await Link.find({ owner: req.user.userId }) 
        res.json(links)
    } catch (error) {
        return res.status(500).json({message: "?"})
    }
})

router.get("/:id", auth,  async (req, res) => {
    try {
        const links = await Link.findById(req.params.id) 
        res.json(links)
    } catch (error) {
        return res.status(500).json({message: "?"})
    }
})
module.exports = router


