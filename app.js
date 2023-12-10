const express = require("express")
const config = require("config")
const mongoose = require("mongoose")

const app = express()

const PORT = config.get("port") || 5000

async function start() {
    try {
        await mongoose.connect()
    } catch (error) {
        console.log(error.message)
        process.exit()
    }
}

start()
app.listen(5000, () => console.log(`123, port: ${PORT}`))