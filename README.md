# 🎮 Mini Games Hub

A lightweight, modular web-based collection of mini games — all in one central place. Designed for casual fun, offline use, and fast loading.

## 🚀 Features

- 🧠 Multiple simple mini games (memory, reaction, typing, etc.)
- 🖱️ Mouse and keyboard friendly
- 🌐 100% web-based – runs in any modern browser
- 🧩 Modular architecture – easy to add new games
- 🎨 Custom UI with animated transitions
- 💾 Optional save system using localStorage

## 📂 Structure

mini-games-hub/
│
├── index.html # Main hub interface
├── style.css # Global styling
├── script.js # Main navigation logic
│
├── games/ # Game folders
│ ├── memory/
│ │ ├── index.html
│ │ ├── memory.js
│ │ └── memory.css
│ ├── reaction/
│ │ ├── index.html
│ │ ├── reaction.js
│ │ └── reaction.css
│ └── ...
│
├── assets/ # Images, sounds, icons
└── readme.md

markdown
Copy
Edit

## 🎯 Game Ideas (Included or Planned)

- 🃏 Memory Match
- ⏱️ Reaction Test
- ⌨️ Typing Challenge
- 🎲 Dice Roller
- 🚀 Avoid the Blocks
- ⚔️ Click Duel (2-player)

## 🛠️ How to Use

1. Clone or download the repository
2. Open `index.html` in your browser
3. Click on a game to play it

No installation required – works fully offline.

## 🔌 Optional: Hosting

You can host it on your own server (e.g., Synology NAS or Raspberry Pi) by placing the folder in your web directory.

## 👷 Add a New Game

1. Create a folder under `/games/`
2. Add an `index.html`, `game.js`, and `game.css`
3. Register it in `script.js` if needed

## ⚖️ License

MIT License – use it freely, modify it, and have fun 🎉
