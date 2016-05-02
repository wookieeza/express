var express = require('express');
var app = express();

app.get('/blocks', function(request, response){
    var blocks = ['Fixed','Movable','Rotating'];
    if(request.query.limit >=0){
        response.json(blocks.slice(0,request.query.limit));
    }else{
        response.json(blocks);
    }
});

var blocks = {
    'Fixed':'Fixed desc',
    'Movable':'Movable desc',
    'Rotating':'Rotating desc'
}

app.get('/blocks/:name', function(request, response){
  var desc = blocks[request.params.name];
    if(!desc){
        response.status(404).json('No desc found for '+request.params.name);
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