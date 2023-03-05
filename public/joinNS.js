const joinNs = (endPoint) => {

    const edSocket = io(`http://localhost:9000/${endPoint}`)

    edSocket.on('nsRooms', (nssocket) => {

        let rooms = document.querySelector('.room-list')
        rooms.innerHTML = "";

        nssocket.forEach(el => {
            let glyph;

            if (el.privateRoom) {
                glyph = 'lock'
            } else {
                glyph = 'globe'
            }

            rooms.innerHTML += `<li class="roomy"><span class="glyphicon glyphicon-${glyph}"></span>${el.roomTitle}</li>`
        })

        Array.from(document.getElementsByClassName('roomy')).forEach(el => {
            el.addEventListener('click', (val) => {
                console.log("someone clicked", val.target.innerHTML)
            })
        })

    })

    edSocket.on('messageToClients', (msg) => {
        console.log(msg)
        document.querySelector('#messages').innerHTML += `<li>${msg.text}</li>`
    })

    document.querySelector('.message-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const newMessage = document.querySelector('#user-message').value;
        socket.emit('newMessageToServer', { text: newMessage })
    })



}

