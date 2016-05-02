var express = require('express');
var app = express();
//npm install body-parser
var bodyParser = require('body-parser');
//false forces use of teh native Node query string library
var parseUrlEncoded = bodyParser.urlencoded({extended:false});


var blocks = {
    'Fixed':'Fixed desc',
    'Movable':'Movable desc',
    'Rotating':'Rotating desc'
};

app.use(express.static('public'));

//static route
app.get('/blocks', function(request, response){
    //var blocks = ['Fixed','Movable','Rotating'];
    if(request.query.limit >=0){
        response.json(Object.keys(blocks).slice(0,request.query.limit));
    }else{
        response.json(Object.keys(blocks));
    }
});

app.param('name', function(request, response, next){
    var name = request.params.name;
    var block = name[0].toUpperCase()+name.slice(1).toLowerCase();
    request.blockName = block;
    next();
});

//dynamic route
app.get('/blocks/:name', function(request, response){
    var desc = blocks[request.blockName];
    console.log(request.blockName);
    console.log(blocks);
    if(!desc){
        response.status(404).json('No desc found for '+request.params.name);
    }else {
        response.json(desc)
    }
});
//can take multiple handlers as arguments, and are run in order
app.post('/blocks', parseUrlEncoded, function(request, response){
  var newBlock = request.body;
    var block = newBlock.name[0].toUpperCase()+newBlock.name.slice(1).toLowerCase();
    blocks[block] = newBlock.description;
    response.status(201).json(block);
});

app.listen(3000, function(){
    console.log('Ready...');
});