//Lets require/import the HTTP module
var http = require('http');

//Lets define a port we want to listen to
const PORT=8888; 

//We need a function which handles requests and send response
function handleRequest(request, response){
    if (request.method === 'GET') {
        response.end('The GET Works!! Path Hit: ' + Math.random());
    }
    if (request.method === 'POST') {
        console.log(request);
        //console.log(request.url);
        response.end('The POST Works!! Path Hit: ' + Math.random());
    }    
    response.end('I do not know how to handle this request!');
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});

// telnet localhost 8888
// GET / HTTP/1.0