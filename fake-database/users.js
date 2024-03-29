const users = [
    {
        username: 'philipp',
        access: [
            {
                "municipality": "luzern",
                "grouped": "false",
                "indicators": ["people_agerange_dummy", "people_number_dummy"],
            },
            {
                "municipality": "zug",
                "grouped": "false",
                "indicators": ["people_number_dummy"],
            }
        ],
    },
    {
        username: 'zachlee',
        access: [
            {
                "municipality": "luzern",
                "grouped": "true",
                "indicators": ["people_agerange_dummy", "people_number_dummy"],
            }
        ],
    }
]

module.exports = {
    users
}