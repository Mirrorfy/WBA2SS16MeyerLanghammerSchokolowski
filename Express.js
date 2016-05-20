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
app.post('/anhang/ressource1', jsonParser, function (req, res) { // Erstellt einen neuen Anhang in der Liste; Parser wandeln den JSON String in eine entsprechende Variable

});

app.get('/liste/ressource1', function (req, res) { //Abruf der Anhangsliste

});


// Anbindung des Servers an den Port
app.listen(3000);