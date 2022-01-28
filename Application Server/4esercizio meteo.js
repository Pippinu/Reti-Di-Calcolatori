var express = require('express');
var app = express();

var bodyParser = require("body-parser");

var obj ={
		"cities": [
        {
            "name": "Roma",
            "value": "33",
        },
		{
            "name": "Milano",
            "value": "34",
        },
    ]
};

app.get('/roma', function (req, res) { // http://localhost:8888/roma
  res.send(obj.cities[0].value);
});

// http://localhost:8888/get_temp?citta=Roma
app.get('/get_temp', function (req, res) {
  //1. prendi la città dal parametro city della get
  // req.query.citta --> Roma
  //2. acceddi all''oggetto corrispondente es: obj.cities[0].value nel caso di Roma
  // for ... 
  //3. resituisci il valore
  // res.send(trovato)
});

// fai la stessa cosa con la post
app.post('/get_temp', function (req, res) {

});


var server = app.listen(8888, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
