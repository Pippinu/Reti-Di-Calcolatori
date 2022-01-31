//Lets require/import the HTTP module
var http = require('http');
var req = require('request');
var axios = require('axios');

//Lets define a port we want to listen to
const PORT=8889; 

//Seerver created with POSTMAN
//We need a function which handles requests and send response
function handleRequest(request, response){
    if(request.method == 'GET') response.end(contact_GET_remote());
    else if(request.method == 'POST') response.end(contact_POST_remote());
    else response.end(console.log('Richiesta non riconosciuta'));
}

function contact_GET_remote(){
	req({
        url: 'http://localhost:8888', //URL to hit
        qs: {from: 'blog example', time: +new Date()}, //Query string data
        method: 'GET',
        headers: {
            'Content-Type': 'MyContentType',
            'Custom-Header': 'Custom Value'
        },
        body: 'Hello Hello!' //Set the body as a string
    }, function(error, resp, body){
    	if(error) {
        	console.log(error);
    	} else {
        	//console.log('-->'+resp.statusCode, body1);
			console.log('**-->'+body);
			return body
    	}
	});
}

function contact_POST_remote(){
	// req({
    //     url: 'http://localhost:8888', //URL to hit
    //     qs: {from: 'blog example', time: +new Date()}, //Query string data
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'MyContentType',
    //         'Custom-Header': 'Custom Value'
    //     },
    //     body: 'Hello Hello!' //Set the body as a string
    // }, function(error, resp, body){
    // 	if(error) {
    //     	console.log(error);
    // 	} else {
    //     	//console.log('-->'+resp.statusCode, body1);
	// 		console.log('**-->'+body);
	// 		return body
    // 	}
	// });

    axios.post('http://localhost:8888', {
        message: 'Bella Zi',
    })
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.log(error);
    })
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});




