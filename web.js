var express = require('express');
var fs = require('fs');
var buf = require('buf');
var app = express.createServer(express.logger());


app.get('/', function(request, response) {
fs.ReadFile('index.html');

response.send(buf.toString());
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
 console.log("Listening on " + port);
});
