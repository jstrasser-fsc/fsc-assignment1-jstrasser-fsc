const request = require('request');

const forecast = (latitude,longitude, callback)=>{
    const url = 'https://api.darksky.net/forecast/17266ae5db9d413c75a044e5e526c7ba/' + encodeURIComponent(latitude)+','+encodeURIComponent(longitude);
    request({url,json: true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather services!',undefined);
         }   
         else if(body.error)
         {
             callback('Unable to find location. Try a different search.',undefined);
         }
         else{
             callback(undefined,body.daily.data[0].summary+' It is currently '+ body.currently.apparentTemperature+ ' degrees out. There is a '+ body.currently.precipProbability+ ' chance of rain. It is ' + body.daily.data[0].dewPoint + ' dew pointy outside.')
         }
    
    })
}

module.exports = forecast;