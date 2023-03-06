const socket = io('http://localhost:9000'); // the / namespace/endpoint

let edSocket = "";


socket.on('listValues', (socket) => {

    let nameSpaceDiv = document.querySelector('.namespaces')

    nameSpaceDiv.innerHTML = ""

    socket.forEach(ns => {
        nameSpaceDiv.innerHTML += `<div class="namespace" ens="${ns.endpoint}"><img src="${ns.img}"/></div>`
    })


    Array.from(document.getElementsByClassName('namespace')).forEach(el => {
        el.addEventListener('click', (e) => {
            const endpoint = el.getAttribute('ens')
            
            joinNs(endpoint)

            console.log(`${endpoint} is what am on now`)

        })
    })

    joinNs('wiki')
})






