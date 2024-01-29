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

export async function getUserResources(username, userAccessFromToken) {
    const resources = { grouped: [], ungrouped: [] }
    for (const access of userAccessFromToken) {
        if (access.grouped) {
            resources.grouped = [
                ...resources.grouped,
                ...await getGroupedResources(access.municipality, access.indicators)
            ]
        } else {
            resources.ungrouped = [
                ...resources.ungrouped,
                ...await getUngroupedResources(access.municipality, access.indicators)
            ]
        }
    }
    return resources;
}

async function getGroupedResources(municipalityName, indicators) {
    const queryResult = await client.query(`SELECT * FROM ${postgresSchema}.indicatoroverview_dev`)
    const filterResults = queryResult.rows.filter(row => indicators.includes(row.category.toLowerCase()))
    const groupedResources = filterResults.map(res => ({ municipality: municipalityName, name: res.name, function: res.functionname }))
    return groupedResources
}

async function getUngroupedResources(municipalityName, indicators) {
    const queryResult = await client.query(`SELECT * FROM ${postgresSchema}.indicatoroverview_dev`)
    const filterResults = queryResult.rows.filter(row => indicators.includes(row.name.toLowerCase()))
    const ungroupedResources = filterResults.map(res => ({ municipality: municipalityName, name: res.name, function: res.functionname }))
    return ungroupedResources
}
