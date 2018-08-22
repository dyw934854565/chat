

var express = require('express');
var app = express();
app.use(express.static(__dirname));
console.log('server start on port 3000');
console.log('open: ' + 'http://localhost:3000/demo');
app.listen(3000);
