// Axios viene usato per CREARE le richieste
var axios = require('axios');
axios.get()

// Express viene usato per INVIARE le richieste
var express = require('express');
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var port = 8888;

var data = {
    var1: 'CiaoneZi',
    var2: 'Fratm',
};

app.get('/', function(axios, res){
    console.log('GET RICEVUTA');
});

app.listen(port);
console.log('Server started at localhost:'+port);
