const Cart = require("../models/Cart")
const Item = require("../models/Item")

class cartController {
    async getCart(req, res) {
        const owner = req.user.id 
        try {
            const cart = await Cart.findOne({ owner }) 
            
            if (cart && cart.items.length > 0) {
                res.status(200).send(cart) 
            } 
            else {
                return res.status(400).send("Cart not found or is empty") 
            }
        } 
        catch (e) {
            res.status(500).send() 
        }
    }

    async addItem(req, res) {
        const owner = req.user.id 
        const itemId = req.params.id
        try {
            const cart = await Cart.findOne({ owner }) 
            const item = await Item.findOne({ _id: itemId }) 

            if (!item) {
                return res.status(404).send({ message: "item not found" }) 
            }
            const price = item.price 
            const name = item.name 
            if (cart) {
                const itemIndex = cart.items.findIndex((item) => item.itemId == itemId) 
                if (itemIndex > -1) {
                    let product = cart.items[itemIndex] 
                    
                    cart.items[itemIndex] = product 
                    await cart.save() 
                    res.status(200).send(cart) 
                } 
                else {
                    cart.items.push({ itemId, name, price }) 
                    cart.price += price

                    await cart.save() 
                    res.status(200).send(cart) 
                }
            }
            else {
            const newCart = await Cart.create({
                owner,
                items: [{ itemId, name, price }],
                price
            })
            return res.status(201).send(newCart)
            }
        } catch (error) {
            console.log(error) 
            res.status(500).send("something went wrong") 
        }
    }

    async deleteItem(req, res){
        const owner = req.user.id;
        const itemId = req.params.id;
        try {
            let cart = await Cart.findOne({ owner });
            const itemIndex = cart.items.findIndex((item) => item._id == itemId);
        if (itemIndex > -1) {
            let item = cart.items[itemIndex];
            cart.items.splice(itemIndex, 1);
            cart = await cart.save();

            res.status(200).send(cart);
            } else {
                res.status(404).send("item not found");
            }
        } catch (error) {
            console.log(error);
            res.status(400).send();
        }
    }
}

module.exports = new cartController()