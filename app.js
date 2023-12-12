const express = require("express")
const config = require("config")
const mongoose = require("mongoose")

const app = express()

app.use(express.json({extended: true}))

app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/link", require("./routes/link.routes"))
app.use("/api/item", require("./routes/item.routes"))
// app.use("/api/cart", require("./routes/cart.routes"))

const PORT = config.get("port") || 5000

async function start() {
    try {
        await mongoose.connect(config.get("mongoUri", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }))
        app.listen(5000, () => console.log(`123, port: ${PORT}`))
    } catch (e) {
        console.log(e.message)
        process.exit()
    }
}

start()
