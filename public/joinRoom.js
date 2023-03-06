const joinRoom = (roomName) => {
    edSocket.emit('joinRoom', roomName, (numberOfUsers) => {

        document.querySelector(".curr-room-num-users").innerHTML = `${numberOfUsers} <span class="glyphicon glyphicon-user"></span>`


    })

    edSocket.on('historyToclient', (newMessages) => {
        const msgUl = document.querySelector('#messages')
        msgUl.innerHTML = ""

        newMessages.forEach(el => {
            const newMsg = textMessages(el)
            msgUl.innerHTML += newMsg
        })

        msgUl.scrollTo(0,msgUl.scrollHeight)
    })

    edSocket.on('NumberOfUser',(users) => {
        
        document.querySelector(".curr-room-num-users").innerHTML = `${users} <span class="glyphicon glyphicon-user"></span>`
    })
};