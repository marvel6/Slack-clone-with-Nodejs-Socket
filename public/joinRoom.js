const joinRoom = (roomName) => {
    edSocket.emit('joinRoom', roomName, (numberOfUsers) => {

        document.querySelector(".curr-room-num-users").innerHTML = `${numberOfUsers} <span class="glyphicon glyphicon-user"></span>`


    })
};