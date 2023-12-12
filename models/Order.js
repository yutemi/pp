const {Schema, model, Types} = require("mongoose")

const orderSchema = new Schema({
    owner: {
        type: Types.ObjectId,
        ref: "User"
    },
    items: [{
        itemId: {
            type: Types.ObjectId,
            ref: "Item",
            required: true
        },
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        },
        price: Number
    }],
    bill: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = model("Order", orderSchema)