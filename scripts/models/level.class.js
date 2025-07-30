class Level {
    enemies;
    backgroundObjects;
    coins;
    food;
    level_end_x = 5000;

    constructor(enemies, backgroundObjects, coins, food) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.food = food;
    }
}