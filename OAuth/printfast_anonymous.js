var express = require('express');
require('dotenv').config()

// Express configuration
var app = express();
// var port = process.env.PORT;
var code = "";
var token = "";
// var client_id = process.env.CLIENT_ID; // fill-in
// var client_secret = process.env.CLIENT_SECRET; // fill-in

const fs = require('fs');

// secret.json file in cui abbiamo la key Client_Secret
let rawdata = fs.readFileSync('../../../../hide/secrets.json');
let sec = JSON.parse(rawdata);

// console.log(sec);
client_id = sec.web.client_id;
client_secret = sec.web.client_secret;
red_uri=sec.web.redirect_uris[0];

port = 3000;

// Ottengo il codice Authorization Grant con il quale posso accedere alle risorse del servizio avendo ricevuto l'autorizzazione dal Resource Owner
var getCode = "https://accounts.google.com/o/oauth2/auth?client_id="+client_id+"&scope=https://www.googleapis.com/auth/photoslibrary.readonly&approval_prompt=force&redirect_uri=http://localhost:3000/&response_type=code";

app.get('/login', function(req, res){

        var info = "nota che l'applicazione di vitaletti@dis.uniroma1.it, mentre i dati sono di andrea.vitaletti@gmail.com"
        res.send(info+"<br><br><button onclick='window.location.href=\""+ getCode +"\"'>Log in with Picasa</button>");
   
});

app.get('/', function (req, res) {
  res.send('code: ' + req.query.code + "<br><br><button onclick='window.location.href=\"/token\"'>Get Token</button>");
  code = req.query.code;
});


app.get('/token', function(req, res){
	
    var url = 'https://www.googleapis.com/oauth2/v3/token';
	var headers = {'Content-Type': 'application/x-www-form-urlencoded'};
	// Notare l'utilizzo di Client_id, Client_Secret e Redirect_Url, come visto nelle slide (Slide 21, 5.OAuth) sono le credenziali
	// con cui ottengo l'autenticazione dall'Authorization Server
	var body ="code="+code+"&client_id="+client_id+"&client_secret="+client_secret+"&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&grant_type=authorization_code";

    var request = require('request');

	request.post({
		headers: headers,
		url:     url,
		body: body
		}, function(error, response, body){
			console.log(body);
			res.send(body + "<br><br><button onclick='window.location.href=\"/token_info\"'>Get Token Info</button>" + "<br><br><button onclick='window.location.href=\"/api\"'>Access API</button>");
			my_obj=JSON.parse(body);
			// Dopo aver ottentuo Authorization Grant, chiedo all'Authorization Server, 'mostrando' l'Authorization Grant che ho avuto l'accesso alle risorse
			// dal Resource Owner, a questo punto ottengo un Token con il quale sono Autorizzato dall'Authorization Server ad accedere al servizio

			// Questo Token viene inviato ad ogni richiesta al Resource Server dove sono contenute le risorse a cui voglio accedere
			token = my_obj.access_token;
			console.log("The token is: "+token);
		});
});

app.get('/token_info', function(req, res){
	
    var url = 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token='+token;
    var request = require('request');

	request.get({
		url:     url
		}, function(error, response, body){
			console.log(body);
			res.send(body+"<br><br><button onclick='window.location.href=\"/api\"'>Access API</button>");
		});
    
});

app.get('/api', function(req, res){
	
	//var url = 'https://picasaweb.google.com/data/feed/api/user/andrea.vitaletti';
	var url = 'https://photoslibrary.googleapis.com/v1/mediaItems'
	var headers = {'Authorization': 'Bearer '+token};
	
  
    var request = require('request');


	request.get({
		headers: headers,
		url:     url,
		}, function(error, response, body){
			console.log(body);
			res.send(body);
		});
    
});


console.log('Server listen in port '+port+'. Connect to localhost');
app.listen(port);
