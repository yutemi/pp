const Order = require("../models/Order")
const Cart = require("../models/Cart")

class orderController {
    async getOrders(req, res) {
        const owner = req.user.id;
        try {
            const order = await Order.find({ owner: owner }).sort({ date: -1 });
            console.log(order)
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

    async createOrder (req, res) {
        const owner = req.user.id;
        try {
            const cart = await Cart.findOne({ owner })
            if (!cart) {
                return res.status(400).send('Cart not found or is empty');
            }
            let sum = 0;
            // cart.map((cartItem) => {
            //     sum += cartItem.price 
            // })
            console.log(cart)
            const order = await Order.create({
                owner,
                items: cart.items,
                price: sum,
                status: "в процессе"
            })
            const data = await Cart.findByIdAndDelete({ _id: cart.id });
            return res.status(201).send({order})
        } catch (e) {
            console.log(e)
            res.status(400).send('400')
            
        }
    }
}

module.exports = new orderController()