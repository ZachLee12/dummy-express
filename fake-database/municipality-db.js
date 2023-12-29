const municipalities = [
    'luzern',
    'zug',
    'bern'
]

const municipalityIndicators = [
    {
        canton: 'luzern',
        indicators: ['people_agerange_dummy', 'people_number_dummy']
    },
    {
        canton: 'zug',
        indicators: ['apotheke_anzahl', 'schule_anzahl']
    },
    {
        canton: 'bern',
        indicators: ['bibliothek_anzahl']
    }
]

module.exports = {
    municipalities,
    municipalityIndicators
}