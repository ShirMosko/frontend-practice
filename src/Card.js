class Card {
    constructor(id, url, dataIndex) {
        this.id = id
        this.dataIndex = dataIndex
        this.isOpen = false
        this.matched = false
        this.url = url
    }

    equals(other) {
        return this.id === other.id &&  this.isOpen && other.isOpen && !this.matched && !other.matched && this.dataIndex !== other.dataIndex
    }

    flip() {
        this.isOpen = !this.isOpen
    }
}

module.exports = Card