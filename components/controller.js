const dependencies = require('../dependencies')
const whatDidHubbleSeeInfo = require('../whatDidHubbleSee.json')
const config = require('../config')

const months = {
    '1': 'January',
    '2': 'February',
    '3': 'March',
    '4': 'April',
    '5': 'May',
    '6': 'June',
    '7': 'July',
    '8': 'August',
    '9': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
}

async function getBirthdayInfo(month, day, year) {
    let monthName = months[month]
    let birthdayInfo = {
        whatDidHubbleSee: {
            name: whatDidHubbleSeeInfo.name[`${monthName} ${day}`],
            caption: whatDidHubbleSeeInfo.caption[`${monthName} ${day}`],
            image: whatDidHubbleSeeInfo.URL[`${monthName} ${day}`],
            year: whatDidHubbleSeeInfo.year[`${monthName} ${day}`]
        }
    }

    let requestObj = { dayStr: `${day}`, getCountry: "0", monthStr: `${month}`, yearStr: `${year}` }
    let mybirthdayfacts = await dependencies.axios.post('https://www.mybirthdayfacts.com/MBFService.asmx/FetchDayHeadlines', requestObj, { headers: { 'Content-Type': 'application/json' } })
    let famousBornOnBirthday = await dependencies.axios.get(`https://playback.fm/ajax/celebrity-birthdays?month=${month}&day=${day}`, { headers: { 'Content-Type': 'application/json', 'host': "playback.fm" } })
    console.log('Inicio debug', famousBornOnBirthday, 'Fin debug')
    birthdayInfo['famous'] = {
        image: famousBornOnBirthday.data.img,
        names: famousBornOnBirthday.data.names[0],
        birthDate: famousBornOnBirthday.data.birthdate,
        birthPlace: famousBornOnBirthday.data.birthplaces[0],
        occupations: famousBornOnBirthday.data.occupations
    }

    for (let n = 0; n < mybirthdayfacts.data.d.length; n++) {

        if (mybirthdayfacts.data.d[n].i == 0) {
            birthdayInfo["song"] = mybirthdayfacts.data.d[n].s
        }

        if (mybirthdayfacts.data.d[n].i == 1) {
            birthdayInfo["movie"] = mybirthdayfacts.data.d[n].s
        }

        if (mybirthdayfacts.data.d[n].i == 2) {
            birthdayInfo["pricePerGalon"] = mybirthdayfacts.data.d[n].s
        }
    }
    return birthdayInfo
}

module.exports = {
    getBirthdayInfo
}