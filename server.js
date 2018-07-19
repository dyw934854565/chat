

var express = require('express');
var app = express();
var proxyMiddleWare = require("http-proxy-middleware");

app.use(
  "/dialogue",
  proxyMiddleWare({
    target: "http://10.32.97.99:44388",
    changeOrigoin: true
  })
);
app.use(express.static(__dirname));

app.listen(8411);
