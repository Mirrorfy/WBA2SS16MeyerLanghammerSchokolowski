// Implementiert mittels des Express Moduls einen Web Service
// (Dienstgeber), der mindestens zwei Routen mit
// unterschiedlichen HTTP Methoden beinhaltet und
// mindestens einmal serverseitig json parst oder einen
// solchen content-type als Response liefert.

// Import von Express
var express = require ('express');
// Anlegen eines Webservers
var app = express();

var bodyParse = require ('body-parser')
// Parser-Objekt
var jsonParser = bodyParser.json()

// Konfiguration des Webservers
app.use(express.static(__dirname + '/public')); // Verzeichnis für direkten Zugriff freigeben

app.use(function(err, req, res, next) { // möglicher Errorhandler
  console.error(err.stack);
  res.end(err.status + ' ' + err.messages);
});

app.use(function (req, res, next) { // Log mit Pfad und Zeitangabe
  console.log('Time: %d ' + ' Request-Pfad: ' + req.path, Date.now());
  next();
});

// Routing

app.get('/anhang', function (req, res) { //Abruf der Anhangsliste
   db.lrange('anhang:*', function(err, reply) {
                var anhang = [];
                reply.forEach(function(element){
                    anhang.push(JSON.parse(element));
                });
                res.status(200).json(anhang);
    });
});


app.post('/notiz/:ID',jsonParser, function (req, res) { //Notiz erstellen
  var newNotiz = req.body;
    
    db.incr('id:notiz', function(err, rep){
        newNotiz.id = rep;
        db.set('Noitz:'+newNotiz.id, JSON.stringify(newNotiz), function(err, rep){
            res.status(200).json(newNotiz);
        });
    });
});


app.get('/Notiz/:ID', function (req, res) { //Notiz anzeigen
    db.get('notiz:'+req.params.id, function(err, rep){
        if(rep){
            res.type('json').send(rep);
        }
        else{
            res.status(404).type('text').send(Diese Notiz wurde nicht gefunden.);
        }
    });
});


app.get('/anhang/:ID', function (req, res) { //Anhang runterladen
    db.get('anhang:'+req.params.id, function(err, rep){
        if(rep){
            res.type('json').send(rep);
        }
        else{
            res.status(404).type('text').send(Dieser Anhang wurde nicht gefunden.);
        }
    });
});


app.post('/anhang/:ID',jsonParser, function (req, res) { //Anhang zufügen
  var newAnhang = req.body;
    
    db.incr('id:anhang', function(err, rep){
        newAnhang.id = rep;
        db.set('Anhang:'+newAnhang.id, JSON.stringify(newAnhang), function(err, rep){
            res.status(200).json(newAnhang);
        });
    });1
});

//ist dies noch nötig, da es sich ja um das gleiche, wie bei dem einzelnen Abruf eines Anhanges handelt?
app.get('/anhang/:ID', function (req, res) { //Suchfunktion in der Anhangsliste
    db.get('anhang:'+req.params.id, function(err, rep){
        if(rep){
            res.type('json').send(rep);
        }
        else{
            res.status(404).type('text').send(Dieser Anhang wurde nicht gefunden.);
        }
    });
});


app.delete('/notiz/:ID', function (req, res) { //Löschen einer Notiz
    db.get('notiz:'+req.params.id, function(err, rep){
        if(rep){
            db.del('notiz:'+req.params.id, function(err, rep){
                res.type('text').send('Notiz wurde gelöscht.');
            });
        }
        else {
            res.status(404).type('text').send('Notiz nicht gefunden');
        }
    });
});


// Anbindung des Servers an den Port
app.listen(3000);
