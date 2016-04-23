//
// fabnet jogger
// Nadya Peek 2016
//
// closure
//
(function(){
//
// module globals
//
var mod = {}
//
// name
//
var name = 'fabnet jogger'
//
// initialization
//
var init = function() {
   mod.address.value = '127.0.0.1'
   mod.port.value = 1234
   mod.moveargs.value = 'hi'
   }
//
// inputs
//
var inputs = {
   moveargs:{type:'String',
      event:function(evt){
         mod.moveargs.value = evt.detail
         send_moves()}}}
//
// outputs
//
var outputs = {
   }
//
// interface is run any of these event functions from inputs
//
var interface = function(div){
   mod.div = div
   div.appendChild(document.createTextNode('address: '))
   input = document.createElement('input')
      input.type = 'text'
      input.size = 10
      div.appendChild(input)
      mod.address = input
   div.appendChild(document.createElement('br'))
   div.appendChild(document.createTextNode('port: '))
   input = document.createElement('input')
      input.type = 'text'
      input.size = 6
      div.appendChild(input)
      mod.port = input
   div.appendChild(document.createElement('br'))
   var btn = document.createElement('button')
      btn.style.margin = 1
      btn.appendChild(document.createTextNode('connect to server'))
      btn.addEventListener('click',function() {
         init_server()
         console.log("connected to server")
         })
      div.appendChild(btn)
   div.appendChild(document.createElement('br'))
   div.appendChild(document.createTextNode('jog:'))
   div.appendChild(document.createElement('br'))
   input = document.createElement('input')
      input.type = 'text'
      input.size = 12
      input.addEventListener('keydown',function(e) {
            jog_move(e)
         })
      div.appendChild(input)
      mod.moveargs = input //mod.moveargs is the html element
   div.appendChild(document.createElement('br'))
   var send = document.createElement('button')
      send.style.margin = 1
      send.appendChild(document.createTextNode('send path'))
      send.addEventListener('click',function() {
         send_moves()
         console.log("sent moves")
         })
      div.appendChild(send)
   div.appendChild(document.createElement('br'))
   div.appendChild(document.createTextNode('response:'))
   div.appendChild(document.createElement('br'))
   var text = document.createElement('textarea')
      text.setAttribute('rows',mods.ui.rows)
      text.setAttribute('cols',mods.ui.cols)
      div.appendChild(text)
      mod.resp = text
   }
//
// local functions
//
function init_server() {
   var url = "ws://"+mod.address.value+':'+mod.port.value
   var ws = new WebSocket(url)
   mod.ws = ws
   ws.onerror = function(event) {
      mod.resp.value = 'cannot connect to '+mod.address.value+':'+mod.port.value
      }
   ws.onopen = function(event) {
      mod.resp.value = 'connected to '+mod.address.value+':'+mod.port.value
      // ws.send('server.worker = '+worker.toString())
      }
   ws.onmessage = function(event) {
      mod.resp.value = event.data
      }
   }

function jog_move(e) {
   switch(e.keyCode) {
      case 37:
         console.log("left!");
         mod.ws.send('[[[-10,0,0]]]');
         break;
      case 39:
         console.log("right!");
         mod.ws.send('[[[10,0,0]]]');
         break;     
      case 38:
         console.log("up!");
         mod.ws.send('[[[0,10,0]]]');
         break;
      case 40:
         console.log("down!");
         mod.ws.send('[[[0,-10,0]]]');
         break;
      case 33:
         console.log("pgup!");
         mod.ws.send('[[[0,0,10]]]');
         break;
      case 34:
         console.log("pgdown!");
         mod.ws.send('[[[0,0,-10]]]');
         break;
   }
}

function send_moves() {
   mod.ws.send(mod.moveargs.value);
   }

//
// return values
//
return ({
   name:name,
   init:init,
   inputs:inputs,
   outputs:outputs,
   interface:interface
   })
}())
