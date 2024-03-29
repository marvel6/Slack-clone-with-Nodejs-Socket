const joinRoom = async (roomTitle, namespaceId) => {

    const ackResp = await namespaceSockets[namespaceId].emitWithAck('joinRoom', { roomTitle, namespaceId });

    document.querySelector('.curr-room-num-users').innerHTML = `${ackResp.numUsers}<span class="fa-solid fa-user"></span>`
    document.querySelector('.curr-room-text').innerHTML = roomTitle;

    document.querySelector('#messages').innerHTML = " "


    ackResp.newJoins.forEach(message => {

        document.querySelector('#messages').innerHTML += buildHtmlREsponse(message)


    })


}