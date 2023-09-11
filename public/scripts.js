const username = "rob"
const password = "password"

const socket = io('http://localhost:9000')

const namespaceSockets = []

const listener = {
    nsChange: []
}

let socketIds = 0;


document.querySelector(".message-form").addEventListener('submit', e => {
    e.preventDefault()

    const newMessage = document.querySelector('#user-message').value

    namespaceSockets[socketIds].emit('newMessageToRoom', {
        username,
        date: Date.now(),
        avatar: 'https://via.placeholder.com/30',
        newMessage,
        socketIds
    })

    document.querySelector('#user-message').value = ""
})



const addListener = (nsId) => {

    if (!listener.nsChange[nsId]) {

        namespaceSockets[nsId].on('messageToRoom', (data) => {

            document.querySelector('#messages').innerHTML += buildHtmlREsponse(data)

        })

        listener.nsChange[nsId] = true

    }
}

socket.on('connect', () => {
    console.log('hello yeah connect')

    socket.emit('clientConnect')
})




socket.on('nsList', (data) => {

    const nslIstDev = document.querySelector('.namespaces')

    nslIstDev.innerHTML = "";


    data.forEach(ns => {

        nslIstDev.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}"></div>`


        if (!namespaceSockets[ns.id]) {

            namespaceSockets[ns.id] = io(`http://localhost:9000${ns.endpoint}`)


        }

        addListener(ns.id)

    })


    Array.from(document.getElementsByClassName('namespace')).forEach(element => {


        element.addEventListener('click', el => {

            joinNs(element, data)

            //console.log(namespaceSockets)

        })
    })


    joinNs(document.getElementsByClassName('namespace')[0], data)


})


