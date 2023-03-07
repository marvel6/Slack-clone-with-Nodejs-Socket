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
    });


    let searchBox = document.querySelector('#search-box');

    searchBox.addEventListener('input', (elem) => {
        Array.from(document.getElementsByClassName('message-text')).forEach(val => {
            if (val.innerText.toLowerCase().indexOf(elem.target.value.toLowerCase()) === -1) {
                val.style.display = "none"
            } else {
                val.style.display = "block"
            }

        })
    })

};