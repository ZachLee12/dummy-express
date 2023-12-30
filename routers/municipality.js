const express = require('express')
const municipalityService = require('../services/municipality-service')
const router = express.Router()

router.get('/all', (req, res) => {
    const allMunicipalities = municipalityService.getAllMunicipality()
    res.json({ 'data': allMunicipalities })
})

router.get('/user/:username', (req, res) => {
    const username = req.params.username
    const data = municipalityService.getUserMunicipalities(username)
    res.json({ 'data': data })
})

router.get('/indicators', (req, res) => {
    const allMunicipalityIndicator = municipalityService.getAllMunicipalityIndicators()
    res.json({ 'data': allMunicipalityIndicator })
})

router.get('/indicators/user/:username', (req, res) => {
    const username = req.params.username
    res.json()
})

// Export the router
module.exports = { router };