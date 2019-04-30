const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app = express ()

// Define for Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Set up Handle Bars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))




app.get('', (req,res)=> {
    res.render('index', {
        title: 'Weather Index Page',
        name: 'rePlay'
    })
})

app.get('/about',(req,res)=> {
    res.render('about',{
        title: 'About',
        name: 'rePlay'

    })
})

app.get('/help',(req,res)=>{
    res.render('help', {
        title: 'Help',
        content: 'Helping you with this',
        name: 'rePlay'
    })
})

// app.get('',(req, res)=> {
//     res.send('Hello Express')

// })

// app.get('/help',(req, res)=> {
//     res.send('Help Page')

// })

app.get('/weather',(req, res)=> {
    if(!req.query.address) {
        return res.send({
            error: 'you need to provide a valid address'
        })
    }
    geocode(req.query.address, (error, {latitude,longitude, location}= {})=>
    {
        if(error) {
            return res.send({
                error
            })
        } forecast(latitude,longitude,(error,forecastData)=> {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address 
            })

        })
    }
    )
    // res.send({
    //     temperature: 45,
    //     percipitation: 0,
    //     address: req.query.address
    // })

})
// Setting up a query for the browser
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a earch term'
        })
    }
    
    console.log(req.query)
    res.send({
        products: []
    })
})

// app.get('/about',(req, res)=> {
//     res.send(
//         '<H1>About the Weather</H1>'
//         )
// })

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        message:'No Help Article Found',
        name: 'rePlay'
    })

})

app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        message:'No page Found',
        name: 'rePlay'
    })

})

app.listen(3000, () => {
    console.log('Server is up')
})