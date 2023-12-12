const {Router} = require("express")
const router = Router()
const Item = require("../models/Item")

router.post("/add", async (req, res) => {
    try {
        // const {name} = req.body

        // const exist = await Item.findOne({name})

        // if (exist) {
        //     return res.json({item: name})
        // }

        const data = {
            name: "сепулька 1",
            price: "20",
            desc: "aoaoa",
            url: "https://i.pinimg.com/564x/52/fd/ab/52fdab1d799bd183df41ba89d59351e8.jpg"
        }

        const item = new Item(data)
        console.log(item)
        await item.save()

        res.status(201).json({item})
    } catch (e) {
    }
})

router.get("/", async (req, res) => {
    try {
        const items = await CartItem.find({ owner: req.user.userId }) 
        res.json(items)
    } catch (error) {
        return res.status(500).json({message: "?"})
    }
})

router.get("/:id", async (req, res) => {
    try {
        const item = await Item.findById(req.params.id) 
        res.json(item)
    } catch (e) {
        return res.status(500).json({message: "?"})
    }
})
module.exports = router


