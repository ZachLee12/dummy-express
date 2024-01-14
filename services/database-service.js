import pkg from 'pg'
import * as dotenv from 'dotenv'
dotenv.config()
const { Client } = pkg
const postgresConfig = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    user: process.env.POSTGRES_USER
}
const postgresSchema = process.env.POSTGRES_SCHEMA

const client = new Client(postgresConfig)
await client.connect()

export async function getOneUser(username) {
    const result = await client.query(`SELECT * FROM ${postgresSchema}.users WHERE username=$1`, [username])
    return result.rows[0]
}

export async function getUserMunicipalities(username) {
    const result = await client.query(`SELECT * FROM ${postgresSchema}.users WHERE username=$1`, [username])
    const access = result.rows[0].access
    return access.map(acc => acc.municipality)
}

export async function getUserIndicators(username) {
    const result = await client.query(`SELECT * FROM ${postgresSchema}.users WHERE username=$1`, [username])
    const access = result.rows[0].access
    return access.map(acc => {
        return {
            municipality: acc.municipality,
            indicators: acc.indicators
        }
    })
}