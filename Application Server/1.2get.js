//Lets require/import the HTTP module
var http = require('http');
var req = require('request');

//Lets define a port we want to listen to
const PORT=8889; 

//We need a function which handles requests and send response

function handleRequest(request, response){
	response.end(contact_remote());
}

function contact_remote(){
	req({
    	url: 'http://localhost:8888', //URL to hit
    	method: 'GET'
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


//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);


});




