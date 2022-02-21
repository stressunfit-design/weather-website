const request = require("request")
// const geocode = require("./utils/geocode")

const forecast = (latitude,longitude, callback) => {
    const lat = encodeURIComponent(latitude)
    const long = encodeURIComponent(longitude)
  
    const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=fe9d154711d743079cdea8b1c9aa0ad8`
  
    request({url, json: true}, (error,{body}) =>{
      if(error){
        callback('Unable to fetch the forecast',undefined)
      }
      else if(body.error){
        callback("Invalid Location", undefined)
      }
      else{
        callback(undefined , `Currently in the city of ${body.data[0].city_name} the temperature is ${body.data[0].temp} and the sky is ${body.data[0].weather.description}`)
      }
    })
  }
  

  

  module.exports = forecast