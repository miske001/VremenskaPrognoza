const express = require('express');
const hbs = require('hbs'); //handlebars
const path = require('path');
const app = express();

const weatherData = require('../utils/weatherData');

const port = process.env.PORT || 3000;

const publicStaticDirPath = path.join(__dirname, '../public'); //ove tri putanje omogucavaju pristupanje fajlovima bez navodjenja putanje kasnije

const viewsPath = path.join(__dirname, '../templates/views');

const partialsPath = path.join(__dirname, '../templates/partials');


app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));

app.get('', (req,res) => {
    res.render('index', {
        title: 'Vremenska Prognoza'
    })
})

//localhost:3000/weather?address=nis
app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error: "Morate da unesete adresu u polje za tekst!"
        })
    }

    weatherData(address, (error, {temperature, description, cityName} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        console.log(temperature, description, cityName);
        res.send({
            temperature,
            description,
            cityName
        })
    })
})

app.get("*", (req,res) => {
    res.render('404', {
        title: 'Stranica nije pronadjena'
    })
})

app.listen(port, () => {
    console.log("Server is up running on port: ", port);
})