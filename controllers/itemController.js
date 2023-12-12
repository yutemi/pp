// const uuid = require("uuid")
const path = require("path");
const Item = require("../models/Item")

class itemController {
    // async create(req, res) {
    //     try {
    //         let {name, price, brandId, typeId, info} = req.body
    //         const {img} = req.files
    //         let fileName = uuid.v4() + ".jpg"
    //         img.mv(path.resolve(__dirname, "..", "static", fileName))
    //         const device = await Device.create({name, price, brandId, typeId, img: fileName});
    //         if (info) {
    //             info = JSON.parse(info)
    //             info.forEach(i =>
    //                 DeviceInfo.create({
    //                     title: i.title,
    //                     description: i.description,
    //                     deviceId: device.id
    //                 })
    //             )
    //         }
    //         return res.json(device)
    //     } catch (e) {
    //         return res.status(400).json({
    //             errs: errs.array(),
    //             message: "что-то не так"
    //         })
    //     }
    // }

    async getAll(req, res) {
        try{
            let {brandId, typeId, limit, page} = req.query
            page = page || 1

            limit = limit || 2

            let offset = page * limit - limit
            const items = await Item.find()
            console.log(items)
            // return res.json(items)
        } catch(e) {
            console.log(e)
        }
    }

    async getOne(req, res) {
        try {
            const item = await Item.findById(req.params.id)
            return res.json(item)
        } catch (e) {
            return res.status(500).json({message: e})
        }
    }
}

module.exports = new itemController()
