const geocode= require("./utils/geocode")
const forecast = require("./utils/forecast")

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port= process.env.PORT ||3000 

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Abhay'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Abhay'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Enter the location you want to know the weather for in the search box and press enter or click on the search button. ',
        aboutText: 'You can also click on the about button to know more about me.',
        title: 'Help',
        name: 'Abhay'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(longitude,latitude,(error,forcastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast:forcastData.forecast,
                rainfall:forcastData.rainfall,
                wind:forcastData.wind,
                cloud:forcastData.cloud,
                location,
                address:req.query.address
            })
        })

    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abhay',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abhay',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})