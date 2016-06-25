var express = require ('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var ejs = require('ejs');
var fs = require('fs');
var http = require('http');

var app = express();


// alle Notizen aufrufen (direkt auf der main)
app.get('/Notiz', jsonParser, function(req, res){
  var NotizID = req.param('id');
  fs.readFile('./main.ejs', {encoding: 'utf-8'}, function(err, filestring){
    if (err) {
      throw err;
    } else {
      var options = {
        host: 'localhost',
        port: 3000,
        path: '/Notiz',
        method: 'GET',
        headers: {
          accept: 'application/json'
        }
      }
      
      
      var externalRequest = http.request(options, function(externalResponse) {
        console.log('Connected');
        externalResponse.on('data', function(chunk) {
          
          var notizdata = JSON.parse(chunk);
          
          var html = ejs.render(filestring; notizdata);
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


// einzelne Notiz aufrufen
app.get('/Notiz/:ID', jsonParser, function(req, res){
  var NotizID = req.param('id');
  fs.readFile('./Notiz.ejs', {encoding: 'utf-8'}, function(err, filestring){
    if (err) {
      throw err;
    } else {
      var options = {
        host: 'localhost',
        port: 3000,
        path: '/Notiz/:ID',
        method: 'GET',
        headers: {
          accept: 'application/json'
        }
      }
      
      var externalRequest = http.request(options, function(externalResponse) {
        console.log('Connected');
        externalResponse.on('data', function(chunk) {
          
          var notizdata = JSON.parse(chunk);
          
          var html = ejs.render(filestring; notizdata);
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

// Notiz zufügen
app.post('/Notiz/:ID', jsonParser, function(req, res){
  fs.readFile('./newNotiz.ejs', {encoding: 'utf-8'}, function(err, filestring){
    if (err) {
      throw err;
    } else {
      var options = {
        host: 'localhost',
        port: 3000,
        path: '/Notiz/:ID',
        method: 'POST',
        headers: {
          accept: 'application/json'
        }
      }
      
      var externalRequest = http.request(options, function(externalResponse) {
        console.log('post Notiz');
        externalResponse.on('data', function(chunk) {
          var newNotiz = JSON.parse(chunk);
           var html=ejs.render(filestring, {notiz: newNotiz, filename: "./Templates/newNotiz.ejs"});
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
      
      var externalRequest = http.request(options, function(AnhangAbrufen) {
        console.log('Connected');
        externalResponse.on('data', function(chunk) {
          
          var anhangdata = JSON.parse(chunk);
          
          var html = ejs.render(filestring; anhangdata);
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

app.listen(3001, function(){
  console.log("Server listens on Port 3000");
})
