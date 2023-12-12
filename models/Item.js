const {Schema, model} = require("mongoose")

const Item = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    imageurl: {
        type: String,
        required: true
    }
})


module.exports = model("Item", Item)