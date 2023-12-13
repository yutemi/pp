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
        price: Number
    }],
    price: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
})

module.exports = model("Order", orderSchema)