import express from 'express'
import cors from 'cors'
import pkg from 'body-parser'
import { verifyToken } from './middlewares.js'

const app = express()
const { json } = pkg
const port = 5000

app.use(cors())
app.use(json())

app.get('/', (req, res) => {
    res.send({ data: 'Hallo ich bin ZACHHH' })
})


app.get('/protected', verifyToken, (req, res) => {
    res.send({ data: res.locals.verify })
})


app.listen(port, () => console.log("Server started on " + port))