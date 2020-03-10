const express=require('express')
const path=require('path')
const hbs=require('hbs')

const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()

// Defining paths for Express config
const public=path.join(__dirname,'../','/public')
const views=path.join(__dirname,'../','/templates','/views')
const partials=path.join(__dirname,'../','/templates','partials')
// console.log(views,'\n',partials)

// Setup handlebars engine and views engine
app.set('view engine','hbs')
app.set('views',views)
hbs.registerPartials(partials)

// Setup static directory to serve
app.use(express.static(public))

// Making API request


app.get('/',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Pradumn'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Pradumn',
        helpText:'Some help for you...'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Pradumn'
    })
})
app.get('/weather',(req,res)=>{
if(!req.query.address) 
{
    return res.send({
        'error':'No Address provided.'
    })
}

  geocode(req.query.address,(err,{latitude,longitude,name}={})=>{
        if(err){
            return res.send({err})
        }
        forecast(longitude,latitude,(err,forecastData)=>{
            if(err){
                return res.send({err})
            }
            res.send({
                'location':name,
                'forecast':forecastData,
                'address':req.query.address
            })
        })
    
    })
})
  
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Pradumn',
        errMsg:'Help content not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Pradumn',
        errMsg:'Page not found'
    })
})

app.listen(3000,console.log('Server started on PORT 3000'))