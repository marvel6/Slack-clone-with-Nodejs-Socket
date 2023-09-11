
const buildHtmlREsponse = (message) => {

    return `
    <li>
    <div class="user-image">
        <img src="${message.avatar}" />
    </div>
    <div class="user-message">
        <div class="user-name-time">${ message.username}<span> ${ message.date}pm</span></div>
        <div class="message-text">${message.msg}</div>
    </div>
</li>
    `

}