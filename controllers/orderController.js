const Order = require("../models/Order")

class orderController {
    async getOrders(req, res) {
        const owner = req.user._id;
        try {
            const order = await Order.find({ owner: owner }).sort({ date: -1 });
            if (order) {
                return res.status(200).send(order)
            }
            res.status(404).send('No orders found')
        } catch (error) {
            res.status(500).send()
        }
    }
}

module.exports = new orderController()