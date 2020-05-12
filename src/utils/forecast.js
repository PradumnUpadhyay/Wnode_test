const request=require('request')
let temp;
const forecast=(long,lat,callback)=>{
    const url = 'https://api.darksky.net/forecast/55873b6c04b0ee7ebeec096767266586/'+lat+','+long

    request({ url,json: true }, (err,{body})=> {
     
        if(err) {
            callback('Network Error!!',undefined)
        } else if(body.code) {
            callback('Location does not Exist!',undefined)
        } else {
            temp=(body.currently.temperature-32) * 5/9
            temp=temp.toFixed(2)
            callback(undefined,`${body.currently.summary}. There is ${body.currently.precipProbability*100}% chance of rain. Outside temperature is ${temp} Celcius`)
        }

    })
}

module.exports=forecast