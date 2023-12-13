const {Schema, model, Types} = require("mongoose")

const userSchema = new Schema({
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
    role: {
        type: String,
        default: "USER"
    }
})

module.exports = model("User", userSchema)