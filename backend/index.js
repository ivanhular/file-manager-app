const express = require('express')
const path = require('path')
const cors = require('cors')
const fileRoutes = require('./routes/fileRoutes')

const port = process.env.PORT || 8080
const app = express()

// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use(
    cors({
        origin: [`http://localhost:3000`],
        credentials: true,
    })
)
app.use(express.json())
app.use('/file', fileRoutes)

app.get('/', (req, res) => {
    res.send(`I'm a live`)
})

app.listen(port, () => {
    console.log(`Server running on Port: ${port}`)
})