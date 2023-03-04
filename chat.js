const express = require('express');
const app = express();
const socketio = require('socket.io')

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000);
const io = socketio(expressServer);


const Namespace = require('./data/namespaces')



io.on('connection',(socket)=>{
 
   let nsdata = Namespace.map(ns => {
     return{
        img:ns.img,
        endpoint:ns.endpoint
     }
   })

   socket.emit('listValues',nsdata)

})


Namespace.forEach(name => {
    io.of(name.endpoint).on('connection',(socket) => {
        console.log(`${socket.id} just joined this endpoint ${name.endpoint}`)
    })
})