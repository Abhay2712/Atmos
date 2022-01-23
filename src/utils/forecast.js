const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = "http://api.weatherstack.com/current?access_key=cdce946ad764080c4afed463a285d299&query=" + latitude+","+longitude+"&units=m"

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined,{
                forecast:"Weather is "+response.body.current.weather_descriptions[0] + ". The temprature is " + response.body.current.temperature + " degrees out there.",
                icon:response.body.current.weather_icons[0],
                rainfall:"The humidity level is "+response.body.current.humidity+"% and the rainfall measure is "+response.body.current.precip+" mm.",
                wind:"The wind speed is "+response.body.current.wind_speed+"km/h and the direction is towards "+response.body.current.wind_dir,
                cloud:"The cloud cover is "+response.body.current.cloudcover+"% and the UV index is "+response.body.current.uv_index +" with a visibility of "+response.body.current.visibility+" km." })
        }
    })
}

module.exports = forecast