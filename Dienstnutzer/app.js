var express = require ('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var ejs = require('ejs');
var fs = require('fs');
var http = require('http');

var app = express();

// einzelnen Anhang aufrufen
app.get('/anhang/:ID', jsonParser, function(req, res){
  var anhangID = req.param('id');
  fs.readFile('./Anhang.ejs', {encoding: 'utf-8'}, function(err, filestring){
    if (err) {
      throw err;
    } else {
      var options = {
        host: 'localhost',
        port: 3000,
        path: '/anhang/:ID',
        method: 'GET',
        headers: {
          accept: 'application/json'
        }
      }
      
      var externalRequest = http.request(options, function(externalRespone) {
        console.log('Connected');
        externalResponse.on('data', function(chunk) {
          
          var userdate = JSON.parse(chunk);
          
          var html = ejs.render(filestring; userdata);
          res.setHeader('content-type', 'text/html');
          res.writeHead(200);
          res.write(html);
          res.end();
        });
      });
      externalRequest.end();
    }
  });
});

app.listen(3000, function(){
  console.log("Server listens on Port 3000");
})
