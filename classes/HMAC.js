const crypto = require("crypto-js");

class HMAC {
    constructor(move, key) {
        this.value = crypto.HmacSHA256(move, key).toString();
    }
}

module.exports = HMAC;