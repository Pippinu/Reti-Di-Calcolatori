var express = require('express');
var bodyParser = require("body-parser");
require('dotenv').config();
// var req = require('request');
const { default: axios } = require('axios');

var app = express();
// app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const scrivi_db = async(city, val) => {
    try{
        const response = await axios.put('http://admin:admin@127.0.0.1:5984/my_database/"001"', '{"city": "' + city + '","val":"' + val.toString() + '"}')
        return response.data;
    } catch(error){
        return error.response.data;
    }
}

app.post('/meteo', function(req, res){
  //1. Prelevo la città dalla form req.body.city vedi form_meteo.html
  //   console.log(req.body.city);
  //2. Faccio la chiamata REST a https://openweathermap.org/
  axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + req.body.city + ',IT&appid=' + process.env.OPEN_WEATHER_KEY)
  .then((response) => {
    //3. Scrivo i dati su DB con chiamata REST --> scrivi_db()
    scrivi_db(response.data.name, response.data.main.temp)
    //4. Rispondo all'utente  res.send...
    .then(result => res.send(result));
  })
  .catch((error) => {
    console.log(error.response.status);
  })
});

app.listen(3000);
