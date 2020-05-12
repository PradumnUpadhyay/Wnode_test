
const request=require('request')

const geocode=(address,callback) => {

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoieWFnYW1pMTciLCJhIjoiY2s3N3FlbHN2MGFtbjNwbTl5cmg3bDB1ZiJ9.91MWW0Qs-B0SK_9veXmNvw&limit=1'
    
    request({url, json: true},(err,{body}={})=> {
      
    if(err) {   
            callback('Network Error!!',undefined)
    } else if(body.features.length===0) {
            callback('Wrong location!',undefined)
    } else {
        callback(undefined,{
            latitude: body.features[0].center[1],
            longitude:body.features[0].center[0],
            name: body.features[0].place_name
        })
    }
    })
    }

module.exports=geocode