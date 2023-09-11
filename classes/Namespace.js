
class Namespace {
    constructor(id, name, image, endpoint) {

        this.id = id;
        this.name = name;
        this.image = image;
        this.endpoint = endpoint
        this.room = []

    }

    addRoom(rooms) {
        this.room.push(rooms)
    }

}


module.exports = Namespace