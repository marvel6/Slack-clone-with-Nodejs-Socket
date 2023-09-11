

const joinNs = (element, data) => {

    const inner = element.getAttribute('ns')


    const nsData = data.find(ns => ns.endpoint === inner)
    socketIds = nsData.id

    const roomAlloc = nsData.room

    console.log(roomAlloc);

    let roomList = document.querySelector('.room-list')

    roomList.innerHTML = ""

    let roomTitle;

    roomAlloc.forEach((el, i) => {

        if (i === 0) {
            roomTitle = el.roomTitle
        }


        roomList.innerHTML += `<li class="room" namespaceId =${el.namespaceId}><span class="fa-solid fa-${(el.privateRoom) ? 'lock' : 'globe'} "></span>${el.roomTitle}</li>`
    })

    joinRoom(roomTitle, nsData.id)

    const roomNodes = document.querySelectorAll('.room')

    Array.from(roomNodes).forEach(elem => {

        elem.addEventListener('click', e => {

            // console.log(`i clicked on ${}`)

            const namespaceId = elem.getAttribute('namespaceId')

            joinRoom(e.target.innerText, namespaceId)
        })

    })

}