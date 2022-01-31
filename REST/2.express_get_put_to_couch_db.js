var express = require('express');
var request2server = require('request');
// npm install body-parser
// deprecated
// var bodyParser = require("body-parser");

var app = express();
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

app.get('/get', function(req, res){

    request2server({
        url: 'http://admin:admin@127.0.0.1:5984/my_database/1', //URL to hit
        //qs: {from: 'blog example', time: +new Date()}, //Query string data
        method: 'GET',
        //headers: {
        //    'Content-Type': 'MyContentType',
        //    'Custom-Header': 'Custom Value'
        //},
        //body: 'Hello Hello!' //Set the body as a string
    }, function(error, response, body){
        if(error) {
            console.log(error);
        } else {
            res.send(response.statusCode+" "+body)
            console.log(response.statusCode, body);
        }
    });
  ;
});

app.get('/put', function(req, res){

    console.log(req.query);
    /*
    body1={
        "name": "mario",
        "surname": "vitaletti"
    };
    */
    request2server({
        url: 'http://admin:admin@127.0.0.1:5984/my_database/'+req.query.id, 
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: '{"name": "reti","surname": "calcolatori"}'
        //body: JSON.stringify(body1)
    }, function(error, response, body){
        if(error) {
            console.log(error);
        } else {
            res.send(response.statusCode+" "+body)
            console.log(response.statusCode, body);
        }
    });
  ;
});

app.listen(8889);