const express = require('express');
const env = require('dotenv')
const mongoose = require('mongoose')

env.config()
const app = express(); // express object

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get("/home", (req, res) => {
    res.json({
        success: true
    })
})

app.listen(process.env.PORT, async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("MONGO CONNECTED")
    }   
    catch (error) {
        console.log("FAILED TO CONNECT TO MONGO")
        process.exit(1)
    }
        

    console.log(`Server started on port ${process.env.PORT}`)
});