const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');
const port = 5000
const jwtSecret = 'zach';  // This should be a long, unguessable string in production

app.use(cors())
app.use(bodyParser.json())

app.get('/protected', (req, res) => {
    const bearerHeader = req.headers['authorization'];
    const token = bearerHeader.split(' ')[1]
    console.log(0)
    if (!token || token.trim() === '') return res.send({ data: 'No token provided or Invalid token format' })

    const payload = jwt.verify(token, jwtSecret, (err, authData) => {
        if (err) {
            console.log(err.message)
            return res.send({ data: "invalid token" })
        }
        console.log(2)
        return res.send({ data: "WELCOME TO COP!", })
    })
})
app.get('/test', (req, res) => {
    console.log('helo')
    return res.send({ data: "hello!" })
})
app.listen(port, () => console.log("Server started on " + port))