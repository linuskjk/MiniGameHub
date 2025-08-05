# Mini Games Hub

Welcome to the Mini Games Hub! This project is a collection of simple browser games that can be played directly in your web browser. The hub serves as a central interface for selecting and playing various games.

## Project Structure

The project is organized as follows:

```
mini-games-hub
├── public
│   └── index.html          # Main page for the Mini Games Hub
├── src
│   ├── main.js             # Entry point for JavaScript functionality
│   ├── components
│   │   ├── GameSelector.js  # Manages game selection interface
│   │   └── GameFrame.js     # Renders the selected game
│   └── games
│       ├── tic-tac-toe
│       │   ├── index.js     # Game logic for Tic Tac Toe
│       │   └── style.css    # Styles for Tic Tac Toe
│       ├── snake
│       │   ├── index.js     # Game logic for Snake
│       │   └── style.css    # Styles for Snake
│       └── pong
│           ├── index.js     # Game logic for Pong
│           └── style.css    # Styles for Pong
├── package.json             # npm configuration file
└── README.md                # Project documentation
```

## Features

- **Game Selection**: Users can choose from multiple games to play.
- **Responsive Design**: The interface is designed to work on various screen sizes.
- **Interactive Gameplay**: Each game is fully interactive and provides a fun experience.

## Getting Started

To get started with the Mini Games Hub, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the necessary dependencies by running `npm install`.
4. Start the development server with `npm start`.
5. Open your web browser and go to `http://localhost:3000` to access the Mini Games Hub.

## Contributing

Contributions are welcome! If you would like to add a new game or improve existing features, please submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.