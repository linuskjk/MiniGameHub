// This file serves as the entry point for the JavaScript functionality of the hub.
// It initializes the application and handles the main logic for game selection and navigation.

import GameSelector from './components/GameSelector.js';
import GameFrame from './components/GameFrame.js';

const games = [
    { name: "Tic Tac Toe", id: "tic-tac-toe", path: "tic-tac-toe" },
    { name: "Snake", id: "snake", path: "snake" },
    { name: "Pong", id: "pong", path: "pong" }
];

document.addEventListener('DOMContentLoaded', () => {
    const gameSelector = new GameSelector(games); // Pass games here!
    const gameFrame = new GameFrame();

    gameSelector.onGameSelect = (game) => {
        gameFrame.loadGame(game);
    };

    gameSelector.render();
});

console.log("Script loaded");