const fakeDatabase = require('../fake-database/municipality-db')

function getAllMunicipality() {
    return fakeDatabase.municipalities
}

function getAllMunicipalityIndicators() {
    return fakeDatabase.municipalityIndicators
}

module.exports = {
    getAllMunicipality,
    getAllMunicipalityIndicators
}

