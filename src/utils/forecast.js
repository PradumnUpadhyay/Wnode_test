const request=require('request')

const forecast=(long,lat,callback)=>{
    const url = 'https://api.darksky.net/forecast/55873b6c04b0ee7ebeec096767266586/'+lat+','+long

    request({ url,json: true }, (err,{body})=> {
     
        if(err) {
            callback('Network Error!!',undefined)
        } else if(body.code) {
            callback('Location does not Exist!',undefined)
        } else {
            callback(undefined,`${body.currently.summary}. There is ${body.currently.precipProbability*100}% chance of rain. Outside temperature is ${body.currently.temperature}`)
        }

    })
}
// forecast(37.8267,'')
module.exports=forecast

// {
//     summary: body.currently.summary,
//     precipProbability: body.currently.precipProbability*100,
//     temperature:body.currently.temperature
// }