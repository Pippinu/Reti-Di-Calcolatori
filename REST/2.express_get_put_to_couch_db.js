var express = require('express');
var request2server = require('request'); 
var axios = require('axios');
// npm install body-parser
// deprecated
var bodyParser = require("body-parser");

var app = express();
// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());
app.use(express.json());

app.get('/get', function(req, res){
    // request2server({
    //     url: 'http://admin:admin@127.0.0.1:5984/my_database/1', //URL to hit
    //     //qs: {from: 'blog example', time: +new Date()}, //Query string data
    //     method: 'GET',
    //     //headers: {
    //     //    'Content-Type': 'MyContentType',
    //     //    'Custom-Header': 'Custom Value'
    //     //},
    //     //body: 'Hello Hello!' //Set the body as a string
    // }, function(error, response, body){
    //     if(error) {
    //         console.log(error);
    //     } else {
    //         res.send(response.statusCode+" "+body)
    //         console.log(response.statusCode, body);
    //     }
    // });

    axios.get('http://admin:admin@127.0.0.1:5984/my_database/1', {
        // data: 'Hello Hello',          ESSENDO GET NO BODY
    })
    .then((response) => {
        res.send(response.statusCode + " " + response.data);
        console.log(response.statusCode, response.data);
    })
    .catch((error) => {
        console.log(error);
    })
});

app.get('/put', function(req, res){
    // console.log(req.query);
    /*
    body1={
        "name": "mario",
        "surname": "vitaletti"
    };
    */

    // RICHIESTA CON request    
    // request2server({
    //     url: 'http://admin:admin@127.0.0.1:5984/my_database/'+req.query.id, 
    //     method: 'PUT',
    //     headers: {
    //         'content-type': 'application/json'
    //     },
    //     body: '{"name": "reti","surname": "calcolatori"}'
    //     //body: JSON.stringify(body1)
    // }, function(error, response, body){
    //     if(error) {
    //         console.log(error);
    //     } else {
    //         res.send(response.statusCode+" "+body)
    //         console.log(response.statusCode, body);
    //     }
    // });

    // RICHIESTE EQUIVALENTI CON axios
    // axios({
    //     method: 'put',
    //     url: 'http://admin:admin@127.0.0.1:5984/my_database/2',
    //     headers: {
    //         'Content-type': 'application/json',
    //         "Accept": "application/json",
    //     },
    //     data: '{"name": "reti","surname": "calcolatori"}',
    // })

    // NOTARE LA DISPOSIZIONE DEGLI ARGOMENTI, axios.put(url, data, config), CONFIG SAREBBERO
    // TUTTI METODI OPZIONALI DEFINITI DALL'ISTANZA axios

    // N.B. Notare l'utilizzop di req.query.id, cioe un parametro passato nell'url, i.e. http://localhost:8889/put?id=23,
    // il quale permette tramite url di inserire una tupla in CouchDB
    axios.put('http://admin:admin@127.0.0.1:5984/my_database/' + req.query.id , '{"name": "reti","surname": "calcolatori"}', {
        headers: {
            'Content-type': 'application/json',
            "Accept": "application/json",
        },
    })
    .then((response) => {
        res.send(response.statusCode + " " + response.data);
        console.log(response.statusCode, response.data);
    })
    .catch((error) => {
        console.log('status: ' + error.response.status + ', statusText: ' + error.response.statusText + ', message: ' + error.response.data.reason);
    })
});

app.listen(8889);