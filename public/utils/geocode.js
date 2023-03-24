const request = require('request')

const geocode = (address, callback)=>{
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoibml6aGFudGgyNiIsImEiOiJjbGZnamlkZ2UwNDBhM3FtbWIydXc2dWQ0In0.w16apvsSjzzfOwIcYFQU7Q&limit=1'

    request({url, json: true},(error, {body})=>{
        if(error){
            callback('Unable to connect to geocoding service!', undefined)
        } else if(body.features.length === 0){
            callback('Unable to find the location!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode