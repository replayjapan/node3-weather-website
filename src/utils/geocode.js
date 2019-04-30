const request = require('request')

const geocode = (address, callback) => {
    const geoToken = 'pk.eyJ1IjoicmVwbGF5anAiLCJhIjoiY2p2MjUxY3puMWNvcjN5cm95bjMwbm1vbiJ9.v9K3lB998jJR4I0ye9MfIg'
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + geoToken + '&limit=1'

request({url, json: true}, (error, {body})=> {
    if (error) {
        callback('Unable to connect to the service', undefined)
    } else if (body.features.length === 0) {
        callback('Unable to get location. Please search for another term', undefined)

    } else {
        callback(undefined, {
            longitude: body.features[0].center[0],
            latitude: body.features[0].center[1],
            location: body.features[0].place_name

        })


    }
})

}


module.exports = geocode