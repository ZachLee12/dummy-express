import express from 'express'
import cors from 'cors'
import pkg from 'body-parser'
import { verifyToken } from './middlewares.js'
import { getOneUser, getOneUserAccess } from './services/database-service.js'

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

app.get('/users/username/:username', async (req, res) => {
    const username = req.params.username
    res.json({ data: await getOneUser(username) })
})

app.get('/users/username/:username/access', async (req, res) => {
    const username = req.params.username
    res.json({ data: await getOneUserAccess(username) })
})


app.listen(port, () => console.log("Server started on " + port))