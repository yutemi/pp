// const uuid = require("uuid")
const path = require("path");
const Item = require("../models/Item")

class itemController {
    async addItem (req, res) {
        const item = req.body
        try {
            const newItem = await Item.create({
                name: item.name,
                price: item.price,
                desc: item.desc,
                imageurl: item.imageurl
            })

            await newItem.save()
            res.status(200).send("ok")
        } catch (error) {
            console.error('Error adding item:', error.message);
        }
    }

    async editItem (req, res) {
        const { name, desc } = req.body
        try {
            await Item.updateOne({"name": name}, {"desc": desc})

            res.status(200).send("ok")
        } catch (error) {
            console.error('Error editing item:', error.message);
        }
    }
    

    async getAll(req, res) {
        try{
            const items = await Item.find()
            res.status(200).send(items)
        } catch(e) {
            console.log(e)
        }
    }

    async getOne(req, res) {
        try {
            const item = await Item.findById(req.params.id)
            res.status(200).send(item)
        } catch (e) {
            return res.status(500).json({message: e})
        }
    }
}

module.exports = new itemController()
