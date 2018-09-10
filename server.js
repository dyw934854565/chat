

var express = require('express');
var app = express();

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8422 });
console.log("websocket start on port 8422");
wss.on('connection', function connection(ws) {
  let t;
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send('机器人自动回复：' + Math.random().toFixed(2) * 100);
  });
  ws.on('close', function close() {
    console.log('disconnected');
    clearInterval(t);
    ws = null;
  });
  ws.send('welcome');
  ws.send('XXX');
  t = setInterval(() => {
    ws && ws.send("5s 心跳包");
  }, 5000);
});


app.use(express.static(__dirname));
console.log('server start on port 8423');
console.log("open: " + "http://localhost:8423/demo");
app.listen(8423);
