const {Schema, model, Types} = require("mongoose")

const schema = new Schema({
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
    image: {
        type: String,
        required: true
    }
})

module.exports = model("Item", schema)