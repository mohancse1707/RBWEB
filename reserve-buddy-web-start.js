var express = require('express');
var proxy = require('express-http-proxy');
var app = express();
var path = require('path');
app.use(express.static(__dirname));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.listen(8500);
