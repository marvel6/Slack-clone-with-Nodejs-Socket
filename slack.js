const express = require('express');
const app = express();
const socketio = require('socket.io');
const Room = require('./classes/Room');
const moment = require('moment')
const namespaces = require('./data/namespaces');

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000);
const io = socketio(expressServer)

app.set('io', io);


//manufactured way to change an ns (without building a huge UI)
app.get('/change-ns', (req, res) => {
    //update namespaces array
    namespaces[0].addRoom(new Room(0, 'Deleted Articles', 0))
    //let everyone know in THIS namespace, that it changed
    io.of(namespaces[0].endpoint).emit('nsChange', namespaces[0]);
    res.json(namespaces[0]);
})



io.on('connection', (socket) => {

    socket.emit('welcome', "Welcome to the server.");
    socket.on('clientConnect', (data) => {

        socket.emit('nsList', namespaces)
    })
})



namespaces.forEach(namespace => {

    io.of(namespace.endpoint).on('connection', (socket) => {

        socket.on('joinRoom', async (roomObj, ackCallBack) => {

            const NameSpaceJoin = namespaces[roomObj.namespaceId]

            const newNameSpaceCheck = NameSpaceJoin.room.find(el => el.roomTitle === roomObj.roomTitle)

            const newJoins = newNameSpaceCheck.history;


            //leave all rooms, because the client can only be in one room
            const rooms = socket.rooms;
            // console.log(rooms);
            let i = 0;
            rooms.forEach(room => {
                //we don't want to leave the socket's personal room which is guaranteed to be first
                if (i !== 0) {
                    socket.leave(room);
                }
                i++;
            })


            socket.join(roomObj.roomTitle);

            const sockets = await io.of(namespace.endpoint).in(roomObj.roomTitle).fetchSockets()

            const socketCount = sockets.length;

            ackCallBack({
                numUsers: socketCount,
                newJoins
            })
        })

        socket.on('newMessageToRoom', messageObj => {

            const rooms = socket.rooms;
            const currentRoom = [...rooms][1];

            const mom = moment.unix(messageObj.date)

            const formattedDateString = mom.format('HH:mm');

            const newObj = {
                username: messageObj.username,
                date: formattedDateString,
                avatar: messageObj.avatar,
                msg: messageObj.newMessage
            }



            io.of(namespace.endpoint).in(currentRoom).emit('messageToRoom', newObj)

            const checkRooms = namespaces[messageObj.socketIds]

            const checkRoomsVal = checkRooms.room.find(names => names.roomTitle === currentRoom)


            checkRoomsVal.addMessage(newObj)

        })

    })
})