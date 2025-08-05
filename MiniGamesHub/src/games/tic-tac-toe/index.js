// This file contains the game logic for the Tic Tac Toe game, including functions for player moves, win conditions, and game resets.

class TicTacToe {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.winner = null;
        this.moves = 0;
    }

    makeMove(index) {
        if (this.board[index] === '' && this.winner === null) {
            this.board[index] = this.currentPlayer;
            this.moves++;
            this.checkWinner();
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    checkWinner() {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const condition of winConditions) {
            const [a, b, c] = condition;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.winner = this.board[a];
                return;
            }
        }

        if (this.moves === 9) {
            this.winner = 'Draw';
        }
    }

    resetGame() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.winner = null;
        this.moves = 0;
    }

    getBoard() {
        return this.board;
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }

    getWinner() {
        return this.winner;
    }
}

const boardEl = document.getElementById('ttt-board');
const statusEl = document.getElementById('ttt-status');
const resetBtn = document.getElementById('ttt-reset');

let game = new TicTacToe();
let aiMode = false;

const modeBtn = document.getElementById('ttt-mode');

modeBtn.onclick = () => {
    aiMode = !aiMode;
    modeBtn.textContent = aiMode ? "Mode: Player vs AI" : "Mode: Player vs Player";
    init();
};

function init() {
    game.resetGame();
    render();
    statusEl.textContent = `Turn: ${game.getCurrentPlayer()}`;
}

function render() {
    boardEl.innerHTML = '';
    game.getBoard().forEach((cell, i) => {
        const div = document.createElement('div');
        div.className = 'ttt-cell';
        div.textContent = cell;
        div.onclick = () => handleMove(i);
        boardEl.appendChild(div);
    });
}

function handleMove(i) {
    if (game.getBoard()[i] || game.getWinner()) return;
    game.makeMove(i);
    render();
    if (game.getWinner()) {
        statusEl.textContent = game.getWinner() === 'Draw' ? "It's a draw!" : `Winner: ${game.getWinner()}!`;
        return;
    }
    statusEl.textContent = `Turn: ${game.getCurrentPlayer()}`;
    // AI move if enabled and it's O's turn
    if (aiMode && game.getCurrentPlayer() === 'O' && !game.getWinner()) {
        setTimeout(() => {
            aiMove();
            render();
            if (game.getWinner()) {
                statusEl.textContent = game.getWinner() === 'Draw' ? "It's a draw!" : `Winner: ${game.getWinner()}!`;
            } else {
                statusEl.textContent = `Turn: ${game.getCurrentPlayer()}`;
            }
        }, 400);
    }
}

function aiMove() {
    // Minimax AI for unbeatable Tic Tac Toe
    const board = game.getBoard().slice();

    function minimax(board, player) {
        const winner = getWinnerForBoard(board);
        if (winner === 'O') return { score: 1 };
        if (winner === 'X') return { score: -1 };
        if (board.every(cell => cell)) return { score: 0 };

        let moves = [];
        for (let i = 0; i < board.length; i++) {
            if (!board[i]) {
                board[i] = player;
                let result = minimax(board, player === 'O' ? 'X' : 'O');
                moves.push({ idx: i, score: result.score });
                board[i] = '';
            }
        }

        if (player === 'O') {
            // Maximize O
            let max = moves.reduce((a, b) => (a.score > b.score ? a : b));
            return max;
        } else {
            // Minimize X
            let min = moves.reduce((a, b) => (a.score < b.score ? a : b));
            return min;
        }
    }

    function getWinnerForBoard(b) {
        const wins = [
            [0,1,2],[3,4,5],[6,7,8],
            [0,3,6],[1,4,7],[2,5,8],
            [0,4,8],[2,4,6]
        ];
        for (const [i, j, k] of wins) {
            if (b[i] && b[i] === b[j] && b[i] === b[k]) return b[i];
        }
        return null;
    }

    // Find the best move for O
    let best = null;
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
            board[i] = 'O';
            let score = minimax(board, 'X').score;
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                best = i;
            }
        }
    }
    if (best !== null) {
        game.makeMove(best);
    }
}

resetBtn.onclick = init;

init();