const socket = io('http://localhost:9000'); // the / namespace/endpoint



socket.on('listValues', (socket) => {

    let nameSpaceDiv = document.querySelector('.namespaces')

    nameSpaceDiv.innerHTML = ""

    socket.forEach(ns => {
        nameSpaceDiv.innerHTML += `<div class="namespace" ens="${ns.endpoint}"><img src="${ns.img}"/></div>`
    })


    Array.from(document.getElementsByClassName('namespace')).forEach(el => {
        el.addEventListener('click', (e) => {
            const endpoint = el.getAttribute('ens')
            console.log(`${endpoint} is what am on now`)

        })
    })

     const edSocket = io('http://localhost:9000/wiki')

     edSocket.on('nsRooms',(nssocket) => {
        
        let rooms = document.querySelector('.room-list')
        rooms.innerHTML = "";

        nssocket.forEach(el => {
            let glyph ;

            if(el.privateRoom){
               glyph = 'lock'
            }else{
                glyph = 'globe'
            }
            
            rooms.innerHTML += `<li><span class="glyphicon glyphicon-${glyph}"></span>${el.roomTitle}</li>`
        })
    
     })


})




socket.on('messageFromServer', (dataFromServer) => {
    console.log(dataFromServer);
    socket.emit('dataToServer', { data: "Data from the Client!" })
})

document.querySelector('#message-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const newMessage = document.querySelector('#user-message').value;
    socket.emit('newMessageToServer', { text: newMessage })
})

socket.on('messageToClients', (msg) => {
    console.log(msg)
    document.querySelector('#messages').innerHTML += `<li>${msg.text}</li>`
})
