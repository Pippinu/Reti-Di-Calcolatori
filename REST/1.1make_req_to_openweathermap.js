require('dotenv').config()
axios = require('axios')

// request DEPRECATA, usare axios
// var request = require('request');

// il file .env è così strutturato, aggiunto a .gitignore
//
// METEO_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// GOOGLE_KEY=yyyyyyyyyyyyyyyyyyyyyyyyyyyyy

// http://api.openweathermap.org/data/2.5/weather?q=Rome&appid=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// var options = {
//   url: 'http://api.openweathermap.org/data/2.5/weather?q=Roma,IT&appid='+process.env.METEO_KEY,
// }

function callback(error, response, body) {
  if (!error && response.status == 200) {
    console.log("###############################");
    console.log(body);
    console.log("###############################");
    console.log(body.coord);
    console.log("###############################");
    console.log(body.coord.lon);
    console.log("###############################");
    console.log(body.coord.lat);
    console.log("###############################");
    console.log("###############################");
    console.log(body.main);
    console.log("###############################");
    console.log(body.main.temp);

    // ********************************************************
/*
    request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+info.coord.lat+','+info.coord.lon+'&radius=500&types=food&key=AIzaSyAPVWnsyoIJ30JraxrqCR5HXt5UWu6Z0XE', function optionalCallback(err, httpResponse, body) {

        console.log(body);

    });
*/
    // ********************************************************
  }
}
// GET CALL USANDO request
// request.get(options, callback);

// GET CALL USANDO axios
axios.get('http://api.openweathermap.org/data/2.5/weather?q=Roma,IT&appid='+process.env.OPEN_WEATHER_KEY)
.then((response, error) => callback(error, response, response.data))
// In caso la citta non sia trovata, error.response.data.message conterra la scritta 'city not found'
.catch((error) => console.log(error.response.data.message));