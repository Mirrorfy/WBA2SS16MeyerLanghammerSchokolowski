var express = require ('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var ejs = require('ejs');
var fs = require('fs');
var http = require('http');

var app = express();


// alle Notizen aufrufen (direkt auf der main)
app.get('/Notiz', jsonParser, function(req, res){
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

//Notiz löschen
app.post('/Notiz/:ID', jsonParser, function(req, res){
  var NotizID = req.param('id');
  fs.readFile('./Notiz.ejs', {encoding: 'utf-8'}, function(err, filestring){
    if (err) {
      throw err;
    } else {
      var options = {
        host: 'localhost',
        port: 3000,
        path: '/Notiz/:ID',
        method: 'DELETE',
        headers: {
          accept: 'application/json'
        }
      }
      
      
      var externalRequest = http.request(options, function(externalResponse) {
        console.log('Notiz gelöscht!');
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
      
      var externalRequest = http.request(options, function(externalResponse) {
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



// alle Anhänge aufrufen
app.get('/anhang', jsonParser, function(req, res){
  fs.readFile('./AnhangListe.ejs', {encoding: 'utf-8'}, function(err, filestring){
    if (err) {
      throw err;
    } else {
      var options = {
        host: 'localhost',
        port: 3000,
        path: '/anhang',
        method: 'GET',
        headers: {
          accept: 'application/json'
        }
      }
      
      var externalRequest = http.request(options, function(externalResponse) {
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


// Anhang zufügen
app.post('/Anhang/:ID', jsonParser, function(req, res){
  fs.readFile('./newAnhang.ejs', {encoding: 'utf-8'}, function(err, filestring){
    if (err) {
      throw err;
    } else {
      var options = {
        host: 'localhost',
        port: 3000,
        path: '/Anhang/:ID',
        method: 'POST',
        headers: {
          accept: 'application/json'
        }
      }
      
      var externalRequest = http.request(options, function(externalResponse) {
        console.log('post Notiz');
        externalResponse.on('data', function(chunk) {
          var newAnhang = JSON.parse(chunk);
           var html=ejs.render(filestring, {anhang: newAnhang, filename: "./Templates/newAnhang.ejs"});
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


// alle Kommentare aufrufen in Notiz.ejs direkt unter der entsprechend kommentierten Notiz
app.get('/notiz/:ID/Kommentar', jsonParser, function(req, res){
  fs.readFile('./Notiz.ejs', {encoding: 'utf-8'}, function(err, filestring){
    if (err) {
      throw err;
    } else {
      var options = {
        host: 'localhost',
        port: 3000,
        path: '/Kommentar',
        method: 'GET',
        headers: {
          accept: 'application/json'
        }
      }
      
      
      var externalRequest = http.request(options, function(externalResponse) {
        console.log('Connected');
        externalResponse.on('data', function(chunk) {
          
          var kommentardata = JSON.parse(chunk);
          
          var html = ejs.render(filestring; kommentardata);
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


// einzelnen Kommentar aufrufen
app.get('/notiz/:ID/Kommentar/:ID', jsonParser, function(req, res){
  var KommentarID = req.param('id');
  fs.readFile('./Kommentar.ejs', {encoding: 'utf-8'}, function(err, filestring){
    if (err) {
      throw err;
    } else {
      var options = {
        host: 'localhost',
        port: 3000,
        path: '/Kommentar/:ID',
        method: 'GET',
        headers: {
          accept: 'application/json'
        }
      }
      
      var externalRequest = http.request(options, function(externalResponse) {
        console.log('Connected');
        externalResponse.on('data', function(chunk) {
          
          varkommentardata = JSON.parse(chunk);
          
          var html = ejs.render(filestring; kommentardata);
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

// Kommentar zufügen
app.post('/notiz/:ID/Kommentar/:ID', jsonParser, function(req, res){
  fs.readFile('./newKommentar.ejs', {encoding: 'utf-8'}, function(err, filestring){
    if (err) {
      throw err;
    } else {
      var options = {
        host: 'localhost',
        port: 3000,
        path: '/Kommentar/:ID',
        method: 'POST',
        headers: {
          accept: 'application/json'
        }
      }
      
      var externalRequest = http.request(options, function(externalResponse) {
        console.log('post Kommentar');
        externalResponse.on('data', function(chunk) {
          var newKommentar = JSON.parse(chunk);
           var html=ejs.render(filestring, {Kommentar: newKommentar, filename: "./Templates/newKommentar.ejs"});
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

//Kommentar löschen
app.post('/notiz/:ID/Kommentar/:ID', jsonParser, function(req, res){
  var KommentarID = req.param('id');
  fs.readFile('./Kommentar.ejs', {encoding: 'utf-8'}, function(err, filestring){
    if (err) {
      throw err;
    } else {
      var options = {
        host: 'localhost',
        port: 3000,
        path: '/Kommentar/:ID',
        method: 'DELETE',
        headers: {
          accept: 'application/json'
        }
      }
      
      
      var externalRequest = http.request(options, function(externalResponse) {
        console.log('Kommentar gelöscht!');
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


app.listen(3001, function(){
  console.log("Server listens on Port 3000");
})
