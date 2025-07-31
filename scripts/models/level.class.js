class Level {
    enemies;
    backgroundObjects;
    treasure;
    food;
    level_end_x = 5000;

    constructor(enemies, backgroundObjects, treasure, food) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.treasure = treasure;
        this.food = food;
    }
}