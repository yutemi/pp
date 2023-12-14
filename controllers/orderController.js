const Order = require("../models/Order")
const Cart = require("../models/Cart")

class orderController {
    async getOrders(req, res) {
        const owner = req.user.id;
        try {
            const order = await Order.find({ owner: owner }).sort({ date: -1 });
            if (order) {
                return res.status(200).send(order)
            }
            res.status(404).send('нет заказов')
        } catch (e) {
            res.status(500).send()
        }
    }

    async getAllOrders(req, res) {
        try {
            const order = await Order.find().sort({ date: -1 });
            if (order) {
                                return res.status(200).send(order)
            }
            res.status(404).send('нет заказов')
        } catch (e) {
            res.status(500).send()
        }
    }

    async createSpecialOrder (req, res) { 
        const owner = req.user.id;
        try {
            let sum = 0;
            const order = await Order.create({
                owner,
                price: "заказ по критериям клиента",
                status: "в рассмотрении"
            })
            return res.status(201).send({order})
        } catch (e) {
            console.log(e)
            res.status(400).send('400') 
        }
    }

    async createOrder (req, res) {
        const owner = req.user.id;
        try {
            const cart = await Cart.findOne({ owner })
            if (!cart) {
                return res.status(400).send('Cart not found or is empty');
            }
            let sum = 0;
            cart.items.forEach((cartItem) => {
                sum += cartItem.price;
            });
            const order = await Order.create({
                owner,
                items: cart.items,
                price: sum,
                status: "в ожидании"
            })
            const data = await Cart.findByIdAndDelete({ _id: cart.id });
            return res.status(201).send({order})
        } catch (e) {
            console.log(e)
            res.status(400).send('400') 
        }
    }
    async deleteOrder (req, res) {
        const orderId = req.params.id
        try {
            await Order.deleteOne({"_id": orderId})
        } catch (e) {
            console.log(e)
            res.status(400).send('lll')
        }
    }

    async editOrderStatus (req, res) {
        const {orderId, newStatus} = req.body
        try {
            await Order.updateOne({"_id": orderId}, {"status": newStatus})
            res.status(200).send("done")
        } catch (e) {
            console.log(e)
            res.status(400).send('bbb')
        }
    }
}

module.exports = new orderController()