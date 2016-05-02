var express = require('express');
var app = express();

//sanitise data using a middleware block
app.param('name', function(request, response, next){

    var name = request.params.name;
    var block = name[0].toUpperCase()+name.slice(1).toLowerCase();
    request.blockName = block;

    next();
});

var blocks = {
    'Fixed':'Fixed desc',
    'Movable':'Movable desc',
    'Rotating':'Rotating desc'
};

//static route
app.get('/blocks', function(request, response){
    //var blocks = ['Fixed','Movable','Rotating'];
    if(request.query.limit >=0){
        response.json(Object.keys(blocks).slice(0,request.query.limit));
    }else{
        response.json(Object.keys(blocks));
    }
});



var locations = {
    'Fixed':'First floor',
    'Movable':'Second Floor',
    'Rotating':'Penthouse'
};

//dynamic route
app.get('/blocks/:name', function(request, response){
  var desc = blocks[request.blockName];
    if(!desc){
        response.status(404).json('No desc found for '+request.params.name);
    }else {
        response.json(desc)
    }
});

app.get('/locations/:name', function(request, response){
    var desc = locations[request.blockName];
    if(!desc){
        response.status(404).json('No location found for '+request.params.name);
    }else {
        response.json(desc)
    }
});


app.listen(3000, function(){
    console.log('Ready...');
});

//curl -i http://localhost:3000/blocks?limit=1

//curl -i http://localhost:3000/blocks/Fixed
//curl -i http://localhost:3000/blocks/Movable
//curl -i http://localhost:3000/blocks/Banana

//curl -i http://localhost:3000/blocks/FiXED

//curl -i http://localhost:3000/locations/FIXEd