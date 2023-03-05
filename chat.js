const express = require('express');
const app = express();
const socketio = require('socket.io')
const df = require('silly-datetime')

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000);
const io = socketio(expressServer);


const Namespace = require('./data/namespaces')



io.on('connection', (socket) => {

    let nsdata = Namespace.map(ns => {
        return {
            img: ns.img,
            endpoint: ns.endpoint
        }
    })

    socket.emit('listValues', nsdata)

})


Namespace.forEach(name => {
    io.of(name.endpoint).on('connection', (socket) => {

        //console.log(`${socket.id} just joined this endpoint ${name.endpoint}`)
        // get all possible rooms  to join

        socket.emit('nsRooms', Namespace[0].rooms)

        socket.on('joinRoom',async(rooms,numberOfUsers) =>{

            socket.join(rooms)

            io.of('/wiki').in(rooms).clients((error,clients)=>{
                numberOfUsers(clients.length)
            })
            
        })

        socket.on('newMessageToServer',(data) =>{

            const msg = {
                text:data.text,
                time:df.format(Date.now,'HH:mm a '),
                avatar:'https://via.placeholder.com/30',
                username:'Marvellous Solomon'
                
            }
           
            let joinRoom = (Object.keys(socket.rooms))[1]

            //console.log(joinRoom)

           io.of('/wiki').to(joinRoom).emit('messageToClients',msg)

        })
    })
})