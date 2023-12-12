const {Schema, model, Types} = require("mongoose")

const schema = new Schema({
    email: {
        type: String,
        required: true, 
        unique: true
    },
    passw: {
        type: String, 
        required: true
    },
    cart: [{
        type: Types.ObjectId,
        ref: "Cart"
    }],
    links: [{
        type: Types.ObjectId, 
        ref: "Link"
        }],
    role: {
        type: String,
        default: "USER"
    }
})

module.exports = model("User", schema)