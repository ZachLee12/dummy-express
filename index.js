const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');
const port = 5000
const jwtSecret = 'zach';  // This should be a long, unguessable string in production

app.use(bodyParser.json())

app.get('/protected', (req, res) => {
    const bearerHeader = req.headers['authorization'];
    const token = bearerHeader.split(' ')[1]

    const payload = jwt.verify(token, jwtSecret, (err, authData) => {
        if (err) {
            return res.send({ data: "invalid token" })
        }
        return res.send({ data: "success", })
    })

})
app.listen(port, () => console.log("Server started on " + port))