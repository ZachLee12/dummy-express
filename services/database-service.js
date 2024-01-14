import { Client } from 'pg'

const postgresConfig = {
    "host": process.env.POSTGRES_HOST,
    "port": process.env.POSTGRES_PORT,
    "database": process.env.POSTGRES_DB,
    "password": process.env.POSTGRES_PASSWORD
}

const database = new Client(postgresConfig)
const connection = await database.connect()

function getOneUser(username) {

}