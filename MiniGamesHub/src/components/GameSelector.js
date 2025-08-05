class GameSelector {
    constructor(games) {
        this.games = games;
        this.onGameSelect = null;
    }

    render() {
        const selector = document.getElementById('game-selector');
        selector.innerHTML = ''; // Clear previous content

        const list = document.createElement('ul');
        this.games.forEach(game => {
            const item = document.createElement('li');
            const button = document.createElement('button');
            button.textContent = game.name;
            button.onclick = () => {
                console.log('Selected game:', game.name);
                if (this.onGameSelect) this.onGameSelect(game);
            };
            item.appendChild(button);
            list.appendChild(item);
        });
        selector.appendChild(list);
    }
}

export default GameSelector;