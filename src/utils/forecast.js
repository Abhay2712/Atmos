const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = "http://api.weatherstack.com/current?access_key=804898074beb8e090880d33e6c2f91c6&query=" + latitude+","+longitude+"&units=m"

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined,response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degrees out. There is a "+response.body.current.precip+"% chance of rain.")
        }
    })
}

module.exports = forecast