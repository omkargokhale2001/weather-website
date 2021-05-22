const express=require('express')
const path=require('path')
const hbs=require('hbs')
const app=express()
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))


//Set up path for express config.
const publicDirPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location.
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather",
        name:"Omkar"
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"Must provide search"
        })
    }
    console.log(req.query.search)
    res.send({
        products:[],
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About",
        name:"Omkar"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        message:"Help is always provided, all you have to do is ask.",
        name:"Omkar"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send(
            {
                error:"You need to specify an address"
            }
        )
    }
    geocode(req.query.address,(error,{place,longitude,latitude}={})=>{
        if(error){
            res.send(
                {
                    error:"Pls enter valid address"
                }
            )
        }
        else{
            forecast(longitude,latitude,(error,data)=>{
                res.send(
                    {
                        forecast:data,
                        place:place
                    }
                )
            })
        }
    })
})

//Set up static directory to serve
app.use(express.static(publicDirPath))

app.get('/weather',(req,res)=>{
    res.send({
        name:"Omkar",
        age:19
    })
})

app.get('/help/*',(req,res)=>{
    res.render('errorPage',{
        message:"Help article not found!"
    })
})

app.get('*',(req,res)=>{
    res.render('errorPage',{
        message:"Page not found"
    })
})

app.listen(3000,()=>{
    console.log("Server started on 3000...")
})