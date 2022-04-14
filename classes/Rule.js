class Rule {

    constructor(moves, index) {
        this.move = moves[index];
        this.weakerMoves = this.addWeakerMoves(moves, index, 1);
        this.strongerMoves = this.addStrongerMoves(moves, index, ((moves.length - 1) / 2) + 1);
    }

    addWeakerMoves(moves, index, count) {
        const win = [];
        while (count <= (moves.length - 1) / 2) {
            win.push(moves[(index + count) % moves.length]);
            count++;
        }
        return win;
    }

    addStrongerMoves(moves, index, count) {
        const lost = [];
        while (count <= (moves.length - 1)) {
            lost.push(moves[(index + count) % moves.length]);
            count++;
        }
        return lost;
    }

}

module.exports = Rule;