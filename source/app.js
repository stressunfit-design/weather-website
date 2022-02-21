const path = require('path')
const express = require("express")
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')



const app = express()

// Define paths for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views') 
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handelbar engine and views location
app.set('views', viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req,res) =>{
    res.render('index',{
        title: 'Weather App',
        name: 'Srajan'
    })
})

app.get('/about', (req,res) =>{
    res.render('about',{
        title: 'About me',
        name : 'Srajan'
    })
}) 

app.get('/help', (req,res) =>{
    res.render('help', {
        title: 'Contact us',
        contact: 'xyz@gmail.com'
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
       return res.send({
            error : 'You must provide an address'
        })
    }

    geocode(req.query.address, (error,{latitude,longitude,location} = {}) => {
        if(error){
           return res.send({error})
        }

        forecast(latitude,longitude, (error,forecastData) =>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast : forecastData,
                location,
                address : req.query.address,
            })
        })
    })

    
} )

app.get('/product', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide search'
        })
    }
    console.log(req.query.search);
    res.send({
        products:[],
    })

})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Srajan',
        errorMessage: 'help article not found'
    })
})

app.get('*',(req,res) =>{
    res.render('404',{
        title: '404',
        name: 'Srajan',
        errorMessage: 'page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000');
})