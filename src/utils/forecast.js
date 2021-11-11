const request = require("request")

const forecast = (latitude, longitude, callback) =>{
    const url = "http://api.weatherstack.com/current?access_key=ec64f60d89f735d757f351ef0031e970&query="+latitude+","+longitude+"&units=f"
    request( {url, json: true} , (error, { body })=>{
        if(error){
            callback("Unable to connect to weather services",undefined)
        }else if(body.error){
            callback("Unable to find location!",undefined)
        }else{
            const data = {
                temperature: body.current.temperature,
                app_temperature:body.current.feelslike,
                description: body.current.weather_descriptions[0]
            }
            callback(undefined,data)
        }
    })
}

module.exports = forecast