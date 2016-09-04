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

//Import Redis
var redis = require('redis');
var db = redis.createClient();


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
//lrange gibt anzahl der keys wieder, hier werden dadurch alle aufgerufen und für jeden einzelnen wird ausgeführt, dass sie in JSON gepusht werden

   db.lrange('anhang:*', function(err, reply) {
                var anhang = [];
                reply.forEach(function(element){
                   anhang.push(JSON.parse(element));
                });
                res.status(200).json(anhang);
    });
});

app.get('/anhang/:ID', function (req, res) { //Anhang runterladen
    db.get('anhang:'+req.params.id, function(err, rep){
        if(rep){
            res.type('json').send(rep);
        }
        else{
            res.status(404).type('text').send("Dieser Anhang wurde nicht gefunden.");
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





app.get('/notiz', function (req, res) { //Abruf der Notizliste

   db.lrange('notiz:*', function(err, reply) {
                var notiz = [];
                reply.forEach(function(element){
                   notiz.push(JSON.parse(element));
                });
                res.status(200).json(notiz);
    });
});

app.post('/notiz/:ID',jsonParser, function (req, res) { //Notiz erstellen
//neue Notiz wird mittels JSON erstellt, incr erhöht key automatisch um eins, set fügt hinzu, wobei mittels stringify die javascript zeichenkette in JSON konvertiert wird

  var newNotiz = req.body;
    
    db.incr('id:notiz', function(err, rep){
        newNotiz.id = rep;
        db.set('Notiz:'+newNotiz.id, JSON.stringify(newNotiz), function(err, rep){
            res.status(200).json(newNotiz);
        });
    });
});


app.get('/Notiz/:ID', function (req, res) { //Notiz anzeigen
//noitz mit entsprechenden parameter wird nach existenz überprüft, wenn vorhanden, dann zurückgegeben, wenn nicht, dann Fehlermeldung
   
 db.get('notiz:'+req.params.id, function(err, rep){
        if(rep){
            res.type('json').send(rep);
        }
        else{
            res.status(404).type('text').send("Diese Notiz wurde nicht gefunden.");
        }
    });
});


app.delete('/notiz/:ID', function (req, res) { //Löschen einer Notiz
//mittels db.get überprüfung ob notiz vorhanden wenn ja, dann mittels db.del Löschung und Ausgabe von Bestätigungsmeldung, wenn nein, dann Fehlermeldung

    db.get('notiz:'+req.params.id, function(err, rep){
        if(rep){
            db.del('notiz:'+req.params.id, function(err, rep){
                res.type('text').send("Notiz wurde gelöscht.");
            });
        }
        else {
            res.status(404).type('text').send("Notiz nicht gefunden");
        }
    });
});


app.get('/notiz/:ID/Kommentar', function (req, res) { //Abruf der Kommentarliste

   db.lrange('Kommentar:*', function(err, reply) {
                var Kommentar = [];
                reply.forEach(function(element){
                   Kommentar.push(JSON.parse(element));
                });
                res.status(200).json(Kommentar);
    });
});

app.post('/notiz/:ID/Kommentar/:ID',jsonParser, function (req, res) { //Kommentar erstellen

  var newKommentar = req.body;
    
    db.incr('id:Kommentar', function(err, rep){
        newNotiz.id = rep;
        db.set('Kommentar:'+newKommentar.id, JSON.stringify(newKommentar), function(err, rep){
            res.status(200).json(newKommentar);
        });
    });
});


app.get('/notiz/:ID/Kommentar/:ID', function (req, res) { //Kommentar anzeigen

 db.get('Kommentar:'+req.params.id, function(err, rep){
        if(rep){
            res.type('json').send(rep);
        }
        else{
            res.status(404).type('text').send("Dieser Kommentar wurde nicht gefunden.");
        }
    });
});


app.delete('/notiz/:ID/Kommentar/:ID', function (req, res) { //Löschen Kommentar

    db.get('Kommentar:'+req.params.id, function(err, rep){
        if(rep){
            db.del('Kommentar:'+req.params.id, function(err, rep){
                res.type('text').send("Kommentar wurde gelöscht.");
            });
        }
        else {
            res.status(404).type('text').send("Kommentar nicht gefunden");
        }
    });
});


// Anbindung des Servers an den Port
app.listen(3000);
