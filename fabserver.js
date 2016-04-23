//
// fabnetserver.js
//
//

var server_port = '1234'
var client_address = '127.0.0.1'

console.log("listening for connections from "+client_address+" on "+server_port)

var server = {}

var WebSocketServer = require('ws').Server
wss = new WebSocketServer({port:server_port})

function worker(ws,arg) {
   var child_process = require('child_process')
   console.log("python fabnet_plotter.py '"+arg+"'")
   child_process.exec("python fabnet_plotter.py '"+arg+"'",function(err,stdout,stderr) {
      ws.send(stdout)
      })
   }

server.worker = worker;

wss.on('connection',function(ws) {
   if (ws._socket.remoteAddress != client_address) {
      console.log("error: client address doesn't match")
      return
      }
   ws.on('message',function(msg) {
      //console.log('message: '+msg);
      server.worker(ws,msg);
      })
   })
