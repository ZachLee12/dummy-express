const jwt = require('jsonwebtoken')
const chalk = require('chalk')
const jwtSecret = 'zach'; //Kennwort
const middleware1 = (req, res, next) => {
    console.log(chalk.magenta('[Middleware 1]: I am Middleware 1'))
    console.log(chalk.magenta('[Middleware 1]: doing Middleware 1 stuff...'))
    next()
}

const middleware2 = (req, res, next) => {
    console.log(chalk.cyan('[Middleware 2]: I am Middleware 2'))
    console.log(chalk.cyan('[Middleware 2]: doing Middleware 2 stuff...'))
    next()
}

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    const token = bearerHeader?.split(' ')[1]
    if (!token || token.trim() === '') {
        res.locals.verify = 'Access denied. No token provided or Invalid token format'
        res.status(401)
        return res.send({ data: res.locals.verify })
    }
    const payload = jwt.verify(token, jwtSecret, (err, authData) => {
        if (err) {
            console.log(err.message)
            res.locals.verify = err.message
            res.status(401)
            return res.send({ data: res.locals.verify })
        } else {
            res.locals.verify = "GRANT ACCESS TO COP"
            next() // pass to the next request handler on success
        }
    })
}

module.exports = { middleware1, verifyToken, middleware2 }