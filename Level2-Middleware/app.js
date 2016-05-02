//middleware are building blocks of express
//like servlet filters
//middleware are a stack of functions executed sequentially that access request and response
//this pipe can serve functions of validation, authentication, data parsing etc
//before request is handled by the route.


var express = require('express');

var app = express();

//app.get('/', function(request, response){
//    response.sendFile(__dirname + "/public/index.html");
//});



app.use(function(request, response, next){
//do something
    console.log('A finished validation ');
    next();
});

app.use(function(request, response, next){
//do something
    console.log('B finished authentication');
    next();
});

app.use(function(request, response, next){
//do something
    console.log('C finished data parsing');
    next();
});



//app.use(function(request, response, next){
//  //processing can be completed by route or middleware
//    console.log('D finished whatever');
//    response.send('done!');//ends it
//});

//alternatively use express static middleware
app.use(express.static('public'));
//static middleware serving files from the public folder

app.get('/blocks', function(request, response){
    var blocks = ['Fixed', 'Movable', 'Rotating'];
    //response.send(blocks); // serialises to JSON and sets headers

    response.json(blocks); // for objects and arrays

});

app.listen(3000, function(){
    console.log('Listening on port 3000')
});