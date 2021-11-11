const request = require("request")

const geocode = (address, callback) =>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoibHVjYXNtdXJyYXk5NyIsImEiOiJja3ZwZTM4OG00NzByMnZueWF2bmx6M2Z6In0.pouSnvelCqDE1N8WygJduw&limit=1"
    request( {url, json: true} , (error, { body })=>{
        if(error){
            callback("Unable to connect to location services",undefined)
        }else if(body.features.length === 0){
            callback("Unable to find location!",undefined)
        }else{
            const data = {
                name: body.features[0].place_name,
                lon: body.features[0].center[0],
                lat: body.features[0].center[1]
            }
            callback(undefined,data)
        }
    })
}

module.exports = geocode