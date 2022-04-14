const crypto = require("crypto-js");

class Key {
    constructor() {
        const randomNumber = Math.random().toString();
        this.value = crypto.SHA256(randomNumber).toString();
    }
}

module.exports = Key;