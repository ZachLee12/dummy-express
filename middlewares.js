import pkg from 'jsonwebtoken';
const { verify } = pkg
import { jwtDecode } from "jwt-decode";
const jwtSecret = 'supersecretpassword'; //Kennwort

export const verifyTokenFromHeader = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    const token = bearerHeader?.split(' ')[1]
    req.token = token
    if (!token || token.trim() === '') {
        res.locals.verify = 'Access denied. No token provided or Invalid token format'
        res.status(401)
        return res.send({ data: res.locals.verify })
    }
    const payload = verify(token, jwtSecret, (err, authData) => {
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

export const verifyTokenFromUrl = (req, res, next) => {
    const token = req.query.token
    req.token = token
    const payload = verify(token, jwtSecret, (err, authData) => {
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

export const extractUserAccessFromToken = (req, res, next) => {
    const token = req.token
    req.access = jwtDecode(token).access
    next()
}



