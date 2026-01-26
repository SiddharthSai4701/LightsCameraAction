const express = require('express');
const env = require('dotenv')
const mongoose = require('mongoose')

const movieRouter = require('./routes/movie.routes')

env.config()
const app = express(); // express object

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get("/home", (req, res) => {
    res.json({
        success: true
    })
})

app.use('/mba/api/v1/movies', movieRouter)

const startServer = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("MONGO CONNECTED")
        
        app.listen(process.env.PORT, () => {
            console.log(`Server started on port ${process.env.PORT}`)
        })
    }   
    catch (error) {
        console.log("FAILED TO CONNECT TO MONGO")
        console.error(error)
        process.exit(1)
    }
}

startServer();