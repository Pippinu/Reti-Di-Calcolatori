var express = require('express');
var bodyParser = require("body-parser");
require('dotenv').config();
// var req = require('request');
const { default: axios } = require('axios');

var app = express();
app.use(express.json())

function scrivi_db(city, val){
    // curl -X PUT http://127.0.0.1:5984/my_database/"001" -d '{ " city " : city , " val" :val }'

    /*
    req({
        url: 'http://127.0.0.1:5984/DB/"001"', //URL to hit
        qs: {city: city, val: value}, //Query string data
        method: 'PUT',
        headers: {
            'HTML Form URL Encoded': 'application/x-www-form-urlencoded'
        },
        //body: 'Hello Hello! String body!' //Set the body as a string
    }, function(error, response, body){
        if(error) {
            console.log(error);
        } else {
            console.log(response.statusCode, body);
        }
    });
    */

    // N.B. Notare le "" vicino ai valori city e val, senza questi errore: "invalid UTF-8 JSON"
    axios.put('http://admin:admin@127.0.0.1:5984/my_database/"001"', '{"city": "' + city + '","val":"' + val.toString() + '"}', {
    })
    .then((response) => {
        console.log(response.data);

        let toBeReturned = {
            status: response.status,
            response: response,
        };

        return JSON.stringify(toBeReturned);
    })
    .catch((error) => {
        // console.log(error.response);

        let toBeReturned = {
            status: error.response.status,
            response: error.response.statusText,
        }

        console.log(toBeReturned);
        return JSON.stringify(toBeReturned);
    })
}

app.post('/meteo', function(req, res){
  //1. Prelevo la città dalla form req.body.city vedi form_meteo.html
//   console.log(req.body.city);
  //2. Faccio la chiamata REST a https://openweathermap.org/
  axios.get('http://api.openweathermap.org/data/2.5/weather?q=' + req.body.city + ',IT&appid=' + process.env.OPEN_WEATHER_KEY)
  .then((response) => {
      let retValues = scrivi_db(response.data.name, response.data.main.temp);
      console.log(retValues);
    //   let status = retValues.status;
    //   let resp = retValues.response;

    //   if(status == 200){
    //     console.log(resp)
    //     res.send(resp);
    //   } else {
    //         console.log(resp)
    //         res.send(resp)
    //   }
      
  })
  .catch((error) => {
    console.log(error);
    res.send(error.response.data);
  })
  
  //3. Scrivo i dati su DB con chiamata REST --> scrivi_db()
  //4. Rispondo all'utente  res.send...
  	
  
});

app.listen(3000);
