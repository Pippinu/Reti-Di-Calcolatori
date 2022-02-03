//const util = require('util')
require('dotenv').config({ path: '../../../../hide/.env' })

// il file .env è così strutturato, DA TENERE PRIVATO, NON CARICARE SU GITHUB
//
// METEO_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// GOOGLE_KEY=yyyyyyyyyyyyyyyyyyyyyyyyyyyyy


var request = require('request');

// http://api.openweathermap.org/data/2.5/weather?q=Rome&appid=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

var options = {
  url: 'http://api.openweathermap.org/data/2.5/weather?q=Roma,IT&appid='+process.env.METEO_KEY,
}

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log("###############################");
    console.log(info);
    console.log("###############################");
    console.log(info.coord);
    console.log("###############################");
    console.log(info.coord.lon);
    console.log("###############################");
    console.log(info.coord.lat);
    console.log("###############################");
    console.log("###############################");
    console.log(info.main);
    console.log("###############################");
    console.log(info.main.temp);

    // ********************************************************
/*
    request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+info.coord.lat+','+info.coord.lon+'&radius=500&types=food&key=AIzaSyAPVWnsyoIJ30JraxrqCR5HXt5UWu6Z0XE', function optionalCallback(err, httpResponse, body) {

        console.log(body);

    });
*/
    // ********************************************************
  }
}

request.get(options, callback);
