const joinNs = (endPoint) => {

    edSocket = io(`http://localhost:9000/${endPoint}`)

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

        const topRoom = document.querySelector('.roomy')
        const newRoomName = topRoom.innerText

        joinRoom(newRoomName)

    })


    edSocket.on('messageToClients', (msg) => {
        
        let newMessage = textMessages(msg)

        document.querySelector('#messages').innerHTML += newMessage
    })

    document.querySelector('.message-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const newMessage = document.querySelector('#user-message').value;
        edSocket.emit('newMessageToServer', { text: newMessage })
    })



}

const textMessages = (msges) => {
    const msgs =  `<li>
    <div class="user-image">
        <img src="${msges.avatar}" />
    </div>
    <div class="user-message">
        <div class="user-name-time">${msges.username}<span> ${msges.time} </span></div>
        <div class="message-text">${msges.text}.</div>
    </div>
</li>`

return msgs
}

