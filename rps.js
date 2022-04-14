const readline = require('readline-sync');

let moves = process.argv.slice(2);

const movesLength = moves.length;

let fit = true;

if (movesLength === 0) {
    console.log("No moves entered");
    fit = false;
} else if (movesLength < 3) {
    console.log("Minimum number of moves 3");
    fit = false;
} else if (movesLength % 2 === 0) {
    console.log("Entered an even number of moves");
    fit = false;
}

if (fit) {
    let active = moves[2] ? true : false;

    if (active && !unique(moves)) {
        active = false;
        console.log("Moves must be unique");
    }

    const compMoveChoose = moves[getRandomInt(moves.length)];

    let userMoveChoose = null;

    const Key = require("./classes/Key");
    const key = new Key;

    const HMAC = require("./classes/HMAC");
    const hmac = new HMAC(compMoveChoose, key.value);

    const Table = require("./classes/Table");
    const table = new Table(moves);

    let perform = false;

    while (active) {
        console.log("HMAC:\n" + hmac.value);
        console.log("Available moves:");
        moves.forEach((move, index) => {
            console.log(index + 1 + " - " + move);
        });
        console.log("0 - exit");
        console.log("? - help");
        const choose = readline.question("Enter your move: ");

        if (choose === "?") {
            table.printTable();

        } else if (choose == 0) {
            active = false;
            console.log("Exit");
        } else {
            userMoveChoose = moves[+choose - 1];
        }

        if (active && !userMoveChoose) {
            console.log("Try again");
        } else if (userMoveChoose) {
            console.log("Your move: " + userMoveChoose);
            active = false;
            perform = true;
        }
    }

    if (perform) {
        console.log("Computer move: " + compMoveChoose);
        fight();
        console.log("HMAC key:\n" + key.value);
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function unique(arr) {
        let result = [];

        for (let str of arr) {
            if (!result.includes(str)) {
                result.push(str);
            } else {
                return false;
            }
        }

        return true;
    }

    function fight() {
        for (let i = 1; i < table.table.length; i++) {
            if (table.table[i][0] == compMoveChoose) {
                for (let j = 1; j < table.table.length; j++) {
                    if (table.table[0][j] == userMoveChoose) {
                        switch (table.table[i][j]) {
                            case "<": console.log("You win!");
                                break;
                            case ">": console.log("You lost!");
                                break;
                            default: console.log("Draw!");
                        }
                    }
                }
            }
        }
    }
}
