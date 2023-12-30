const fakeDatabase = require('../fake-database/users')

//Municipality
function getUserMunicipalities(username) {
    const user = fakeDatabase.users.find(user => user.username === username)
    const userMunicipalities = user.access.map(data => data.municipality)
    return userMunicipalities
}

//Indicators
function getAllMunicipalityIndicators() {
    return fakeDatabase.municipalityIndicators
}


module.exports = {
    getUserMunicipalities,
    getAllMunicipalityIndicators
}

