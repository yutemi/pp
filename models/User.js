const {Schema, model} = require("mongoose")

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    pass: {type: String, required: true},
    links: [{type: Types.ObjectId, ref: "Link"}]
})

module.exports = model("User", schema)