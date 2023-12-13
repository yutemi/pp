const {Schema, model, Types} = require("mongoose")

const cartSchema = new Schema({
    owner: {
        type: Types.ObjectId,
        required: true,
        ref: 'User'
    },
    items: [{
        itemId: {
            type: Types.ObjectId,
            ref: 'Item',
        },
        name: String,
        price: Number
    }],
})

module.exports = model("Cart", cartSchema)