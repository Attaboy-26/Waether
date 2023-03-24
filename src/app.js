const path = require('path')
const hbs = require('hbs')
const express =require('express')
const geocode = require('../public/utils/geocode.js')
const forecast = require('../public/utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

const publicdirectorypath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

app.use(express.static(publicdirectorypath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Nizhanth'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About',
        name: 'Nizhanth'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        message: 'Hi! How can I help you?',
        name: 'Nizhanth'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must proide an address!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({error})
        }
    
        forecast(latitude, longitude,(error, forecastdata) => {
            if(error){
                return res.send({error})
            }
            
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res)=>{
    res.render('error', {
        title: '404',
        message: 'Help article not found!',
        name: 'Nizhanth'
    })
})

app.get('*', (req, res)=>{
    res.render('error', {
        title: '404',
        message: 'Page not found!',
        name: 'Nizhanth'
    })
})

app.listen(port, ()=>{
    console.log('Server is up and running on port '+ port + '!')
})