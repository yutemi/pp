const {Schema, model, Types} = require("mongoose")

const Cart = new Schema({
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    },
    items: [
    {
        product: {
            type: Types.ObjectId,
            ref: 'Item'
        },
    }
    ]
});

module.exports = model("Cart", Cart)
