
const Namespace = require('../classes/Namespace')
const Room = require('../classes/Room')

const WikiNs = new Namespace(0, 'wikipedia', 'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png', '/wiki')

const mozillaNs = new Namespace(1, 'mozilla', 'https://www.mozilla.org/media/img/logos/firefox/logo-quantum.9c5e96634f92.png', '/mozilla')

const linuxNs = new Namespace(2, 'linux', 'https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png', '/linux')

WikiNs.addRoom(new Room(0, 'my articles', 0, true))
WikiNs.addRoom(new Room(1, 'my files room', 0))
WikiNs.addRoom(new Room(2, 'newest chats', 0))


mozillaNs.addRoom(new Room(0, 'dev arts', 1))
mozillaNs.addRoom(new Room(1, 'dev circle', 1))
mozillaNs.addRoom(new Room(2, 'dev career', 1))


linuxNs.addRoom(new Room(0, 'software Engineer', 2))
linuxNs.addRoom(new Room(1, 'computer science', 2))
linuxNs.addRoom(new Room(2, 'cyber security news', 2))

const namespace = [WikiNs, mozillaNs, linuxNs]

module.exports = namespace

