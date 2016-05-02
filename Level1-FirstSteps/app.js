//npm install express
var express = require('express'); // gives us a function
var app = express(); //running the function gives us an app instance

app.get('/', function(request, response){
    response.send('Hello World'); // express framework api call, equivalent to
    //response.write('Hello World')//node api calls called by express send
    //response.end();
});

//in web services we will want to be sending arrays and objects
//to illustrate: new route
app.get('/blocks', function(request, response){
  var blocks = ['Fixed', 'Movable', 'Rotating'];
    //response.send(blocks); // serialises to JSON and sets headers

    response.json(blocks); // for objects and arrays
    //curl -i http://localhost:3000/blocks
    //
    //HTTP/1.1 200 OK
    //X-Powered-By: Express
    //Content-Type: application/json; charset=utf-8
    //Content-Length: 30
    //ETag: W/"1e-mXZ6fd+MBYkzxqJ1/e/Otw"
    //Date: Mon, 02 May 2016 11:36:41 GMT
    //Connection: keep-alive
    //
    //    ["Fixed","Movable","Rotating"]%

});

/**
 * btw, html strings returned by express is non standard. for html use templating libraries ejs and jade*/
app.get('/blocks-string', function(request, response){
  var blocks = '<ul><li>Fixed</li><li>Movable</li><li>Rotating</li></ul>';
  response.send(blocks);

    //curl -i http://localhost:3000/blocks-string
    //
    //HTTP/1.1 200 OK
    //X-Powered-By: Express
    //Content-Type: text/html; charset=utf-8
    //Content-Length: 56
    //ETag: W/"38-Pcue1Dq8K3RavTQa6Yn2EQ"
    //Date: Mon, 02 May 2016 11:41:45 GMT
    //Connection: keep-alive
    //
    //<ul><li>Fixed</li><li>Movable</li><li>Rotating</li></ul>
});

app.get('/redirect-me-temp', function(request, response){
  response.redirect(302, '/redirect-here');
    //HTTP/1.1 302 Moved Temporarily
    //X-Powered-By: Express
    //Location: /redirect-here
    //Vary: Accept
    //Content-Type: text/plain; charset=utf-8
    //Content-Length: 48
    //Date: Mon, 02 May 2016 11:46:56 GMT
    //Connection: keep-alive
    //
    //Moved Temporarily. Redirecting to /redirect-here
});

app.get('/redirect-me-perm', function(request, response){
    response.redirect(301, '/redirect-here');
    //HTTP/1.1 301 Moved Permanently
    //X-Powered-By: Express
    //Location: /redirect-here
    //Vary: Accept
    //Content-Type: text/plain; charset=utf-8
    //Content-Length: 48
    //Date: Mon, 02 May 2016 11:48:27 GMT
    //Connection: keep-alive
    //
    //Moved Permanently. Redirecting to /redirect-here
});

app.get('/redirect-here', function(request, response){
    response.send('Redirected here.');
});

//app.post, app.put, app.delete
app.listen(3000, function(){
    console.log("Listening on port 3000");
});