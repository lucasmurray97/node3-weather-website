const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
const path = require("path")
const express = require("express")
const hbs = require("hbs")
const { dirname } = require("path")
const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectory = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Set up handlebars and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectory))

app.get("",(req, res)=>{
    res.render("index", {
        title: "Weather App",
        name: "Lucas Murray"
    })
})

app.get("/about",(req, res)=>{
    res.render("about", {
        title: "About Me!",
        name: "Lucas Murray"
    })
})

app.get("/help",(req, res)=>{
    res.render("help", {
    message: "What can I help u with?",
    title: "Help",
    name: "Lucas Murray"
    })
})

app.get("/weather",(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: "Address must be provided!"
        })
    }
    geocode(req.query.address, (error,{name, lat, lon} = {})=>{
        if(error){
            return res.send({error})
        }
        forecast(lat,lon, (error, {temperature, app_temperature, description, humidity}) => {
            if(error){
                return res.send({error})
            }
            res.send({
                "Location": name,
                "Temperature": temperature,
                "FeelsLike": app_temperature,
                "Description": description,
                "Humidity" : humidity,
                "address": req.query.address
            })
        })
    })
})

app.get("/products", (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get("/help/*", (req,res)=>{
    res.render("404", {
        error: "Help article not found!",
        title: "Error 404",
        name: "Lucas Murray"
        })
})

app.get("*",(req, res)=>{
    res.render("404", {
        error: "Page not found!",
        title: "Error 404",
        name: "Lucas Murray"
        })
})

app.listen(port, ()=>{
    console.log("Server is up on "+port)
})