const Rule = require("./Rule");

class Table {
    constructor(moves) {
        this.rules = this.createTable(moves);
        this.table = this.rulesTable();
    }

    createTable(moves) {
        const rules = [];
        for (let i = 0; i < moves.length; i++) {
            const rule = new Rule(moves, i);
            rules.push(rule);
        }
        return rules;
    }

    rulesTable() {
        const table = [];
        for (let i = 0; i < this.rules.length + 1; i++) {
            table[i] = [];
        }
        table[0][0] = "Moves";
        for (let i = 0; i < this.rules.length; i++) {
            table[0][i + 1] = table[i + 1][0] = this.rules[i].move;
        }
        for (let i = 1; i < table.length; i++) {
            for (let j = 1; j < table.length; j++) {
                if (this.rules[i - 1].strongerMoves.includes(table[0][j])) {
                    table[i][j] = "<";
                } else if (this.rules[i - 1].weakerMoves.includes(table[0][j])) {
                    table[i][j] = ">";
                } else {
                    table[i][j] = "=";
                }
            }
        }
        return table;
    }

    printTable() {
        for (let i = 0; i < this.table.length; i++) {
            let print = "";
            for (let j = 0; j < this.table.length; j++) {
                print += this.table[i][j] + "\t";
            }
            console.log(print);
        }
        console.log();
    }
}

module.exports = Table;