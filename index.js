const express = require('express')
const chalk = require('chalk')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');
const { verifyToken, middleware1, middleware2 } = require('./middlewares');
const port = 5000

app.use(cors())
app.use(bodyParser.json())

// Routers 
const municipalityRouter = require('./routers/municipality').router
app.use('/municipality', verifyToken, municipalityRouter)

app.get('/', (req, res) => {
    res.send({ data: 'Hallo ich bin ZACHHH' })
})


app.get('/protected', verifyToken, (req, res) => {
    res.send({ data: res.locals.verify })
})


app.get('/not-protected', (req, res) => {
    res.send({ data: "I do not check your provided token at all." })
})

app.listen(port, () => console.log("Server started on " + port))