const request = require('request');

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoianN0cmFzc2VyNTIiLCJhIjoiY2s0eW9pcGJ1MDBtcTNrcGRhcmhpaXRzdiJ9.-MhU9aInQfcYi4he5JMXpA&limit=1';
    request({url,json: true},(error,{body})=>{

        if(error){
            callback('Unable to connect to location services!',undefined);
         }   
         else if(body.features.length === 0)
         {
             callback('Unable to find location. Try a different search.',undefined);
         }
         else{
             const features = body.features[0];
             callback(undefined,{
                 latitude: features.center[1],
                 longitude: features.center[0],
                 location: features.place_name
             })
         }
    
    })
}

module.exports=(geocode);