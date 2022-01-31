// Express viene usato dalla parte Server per gestire e rispondere alle 
// richieste inviate dal Client che usa moduli come HTTP e Axios per inviarle
var express = require('express');

// npm install body-parser
var bodyParser = require("body-parser");

var app = express();
// bodyParser strumento per fare il parsing dei parametri
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
  res.send('hello');
});

//curl 'http://localhost:8889/search?id1=12&id2=13'

app.get('/search', function(req, res){
  console.log('/search');
  res.send(req.query);
});

app.get('/orario', function(req, res){
  // accedo a DB è prelevo l'orario per il giorno  	req.query.giorno
  // che mi viene restituio sulla stringa ORARIO
  var ORARIO = "risultato da DB";
  res.send('GET orario del treno per il giorno '+req.query.day+': '+ ORARIO);
  console.log("GET"+req.query.day);
});


//curl -X POST --data "var1=ciao" http://127.0.0.1:8889

app.post('/', function(req, res){
  res.send('body var: ' + req.body.var1);
  console.log(req.body.var1);
});

app.post('/orario', function(req, res){
  var ORARIO = "risultato da DB";
  res.send('POST orario del treno per il giorno <b> ' + req.body.data.day + '</b>  ' + ORARIO);
  console.log(req.body.data.day);
});

app.listen(8889);
