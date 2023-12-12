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
        default: 0
    }
}, {
    timestamps: true
})

module.exports = model("Cart", cartSchema)