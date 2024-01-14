import pkg from 'jsonwebtoken';
const { verify } = pkg

const jwtSecret = 'supersecretpassword'; //Kennwort

export const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    const token = bearerHeader?.split(' ')[1]
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
