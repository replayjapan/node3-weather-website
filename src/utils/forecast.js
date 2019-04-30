const request = require('request')


const forecast = (lat, long, callback) => {

    const url = 'https://api.darksky.net/forecast/89493be54a3810197169f788d6ca02bf/'+lat+','+ long + '?units=si&lang=en'
    request({url, json: true},(error, {body}) => {
        if (error) {
            callback('Unable to connect to the Weather Service at this time', undefined)
    
        } else if (body.error) {
            callback('Unable to find location', undefined)
        }
    
        else { 
            
            const temp = body.currently.temperature
                    const rainPer = body.currently.precipProbability
                    const dailySum = body.daily.data[0].summary
    
            callback(undefined,`${dailySum} It is current ${temp} degrees Celcius. There is a ${rainPer}% chance of rain.`
            
            )
    
        }


    })


  

  }
    

  module.exports = forecast