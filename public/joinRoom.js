const joinRoom = (roomName) => {

    edSocket.emit('joinRoom', roomName, (numberOfUsers) => {

       


    })

    edSocket.on('historyToclient', (newMessages) => {
        const msgUl = document.querySelector('#messages')
        msgUl.innerHTML = ""

        newMessages.forEach(el => {
            const newMsg = textMessages(el)
            msgUl.innerHTML += newMsg
        })

        msgUl.scrollTo(0, msgUl.scrollHeight)
    })

    edSocket.on('NumberOfUser', (users) => {

        document.querySelector(".curr-room-num-users").innerHTML = `${users} <span class="glyphicon glyphicon-user"></span>`
        document.querySelector(".curr-room-text").innerHTML = `${roomName}`
    })

};