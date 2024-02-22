import express from 'express'
import cors from 'cors'
import pkg from 'body-parser'
import { extractUserAccessFromToken, verifyTokenFromUrl, verifyTokenFromHeader } from './middlewares.js'
import { getOneUser, getUserResources } from './services/database-service.js'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { jwtDecode } from 'jwt-decode'

const app = express()
const { json } = pkg
const port = 5000

app.use(cors())
app.use(json())
app.use(morgan('dev'))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send({ data: 'Hallo ich bin ZACHHH' })
})


app.get('/protected', verifyTokenFromHeader, (req, res) => {
    res.send({ data: res.locals.verify })
})

app.get('/users/username/:username', verifyTokenFromHeader, async (req, res) => {
    const username = req.params.username
    res.json({ data: await getOneUser(username) })
})

app.get('/users/username/:username/resources',
    verifyTokenFromHeader,
    extractUserAccessFromToken,
    async (req, res) => {
        const username = req.params.username
        res.json({ data: await getUserResources(username, req.access) })
    })

app.get('/check',
    verifyTokenFromUrl
    , (req, res) => {
        //secure HttpOnly cookie
        res.cookie('token', req.token, { httpOnly: true, secure: true, sameSite: 'strict' });
        res.redirect('/page')
    })

//Serves webpage
app.get('/page',
    async (req, res) => {
        const token = req.cookies.token
        if (token) {
            const { username, access } = jwtDecode(token)
            const resources = await getUserResources(username, access)

            const ungroupedListItemsTemplate = resources.ungrouped.reduce((acc, curr) => {
                return acc + `
                <li>
                <div>${curr.municipality}</div>
                <div>${curr.name}</div>
                <div>${curr.function}</div>
                </li>`

            }, '<h2>Ungrouped Indicators</h2>')

            const groupedListItemsTemplate = resources.grouped.reduce((acc, curr) => {
                return acc + `
                <li>
                <div>${curr.municipality}</div>
                <div>${curr.name}</div>
                <div>${curr.function}</div>
                </li>`
            }, '<h2>Grouped Indicators</h2>')

            let htmlTemplate = `
            <h1>CoP Project</h1>
            <h2>Access for ${username}</h2>
            `

            const accessContainer = `
                    <ol>${ungroupedListItemsTemplate}</ol>
                    <ol>${groupedListItemsTemplate}</ol>
                `

            htmlTemplate += accessContainer
            res.send(htmlTemplate)
        } else {
            res.send(`<h1>UNAUTHORIZED. You do not have access to this project</h1>`)
        }
    })

app.listen(port, () => console.log("Server started on " + port))