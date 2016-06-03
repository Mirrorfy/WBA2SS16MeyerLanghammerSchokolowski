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
app.post('/anhang/:ID', jsonParser, function (req, res) { // Erstellt einen neuen Anhang in der Liste; Parser wandeln den JSON String in eine entsprechende Variable
// siehe hochladen eines anhanges
});

app.get('/liste', function (req, res) { //Abruf der Anhangsliste
  res.send(liste.all());
});

app.post('/notiz/:ID', function (req, res) { //Anlegen einer neuen Notiz
 var notiz = notiz.create(req.body.data);  //req.body.data????
  res.send(201, notiz);
});

app.get('/anhang/:ID', function (req, res) { //Runterladen eines Anhanges
  res.send(anhang.withId(req.params.id));
});


app.post('/anhang/:ID', function (req, res) { //hochladen eines Anhanges
 var anhang = anhang.create(req.body.data);  //req.body.data????
  res.send(201, anhang);
});


app.get('/liste/:ID', function (req, res) { //Suchfunktion in der Anhangsliste
 res.send(anhang.withId(req.params.id));
});

app.delete('/notiz/:ID', function (req, res) { //Löschen einer Notiz
 notiz.del(req.params.id);
  res.send(200);
});


// Anbindung des Servers an den Port
app.listen(3000);
