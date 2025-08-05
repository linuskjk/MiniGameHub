class GameFrame {
    constructor() {
        this.container = document.getElementById('game-frame');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'game-frame';
            document.body.appendChild(this.container);
        }
    }

    loadGame(game) {
        this.container.innerHTML = '';
        const iframe = document.createElement('iframe');
        iframe.src = `/MiniGamesHub/src/games/${game.path}/index.html`;
        iframe.width = "100%";
        iframe.height = "500";
        iframe.style.border = "none";
        this.container.appendChild(iframe);
    }
}

export default GameFrame;