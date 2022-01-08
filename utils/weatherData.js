const request = require('request');
const constants = require('../config');

//KREIRANJE URL-A
const weatherData = (address, callback) => {
    const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + '&appid=' + constants.openWeatherMap.SECRET_KEY;
    request({url, json:true}, (error, {body}) => {
        console.log(body);
        if(error){
            callback("Ne mogu prikupiti podatke iz Open Weather Api-ja ", undefined);
        }
        else if(!body.main || !body.main.temp || !body.name || !body.weather){
            callback("Ne mogu da pronadjem podatke za traženu lokaciju, probajte neku drugu!", undefined);
        }
        else{
            callback(undefined, {
                temperature: body.main.temp,
                description: body.weather[0].description,
                cityName: body.name
            })
        }
    })
}

module.exports = weatherData;